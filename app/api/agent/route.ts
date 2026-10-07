import { NextResponse } from 'next/server';
import { createApplication, findApplication, readApplications, updateApplication } from '@/lib/store';
import { detectServiceType, getServiceConfig, validateDocuments, generateConsentPrompt } from '@/lib/agent';

export async function POST(request: Request) {
  const body = await request.json();
  const language = body.language || 'en';
  const citizenName = body.citizenName || 'Citizen';
  const message = body.message || '';

  if (body.applicationId) {
    const existing = await findApplication(body.applicationId);
    if (!existing) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (body.documents) {
      const validation = validateDocuments(existing.serviceType, body.documents);
      existing.documents = { ...(existing.documents || {}), ...body.documents };

      if (!validation.valid) {
        existing.status = 'documents_needed';
        existing.history = [
          ...(existing.history || []),
          { type: 'validation', message: `Missing docs: ${validation.missing.join(', ')}` },
        ];
        await updateApplication(existing.id, existing);

        return NextResponse.json({
          application: existing,
          response: {
            message: `Some required documents are still missing: ${validation.missing.join(', ')}. Please add them and try again.`,
            requirements: getServiceConfig(existing.serviceType).docs,
            nextStep: 'documents',
          },
        });
      }

      existing.status = 'form_pending';
      existing.history = [
        ...(existing.history || []),
        { type: 'document_validation', message: 'Documents validated successfully.' },
      ];
      await updateApplication(existing.id, existing);

      return NextResponse.json({
        application: existing,
        response: {
          message: 'Great. Your documents are valid. Please complete the application form before consent.',
          nextStep: 'form',
          requirements: getServiceConfig(existing.serviceType).formFields,
        },
      });
    }

    if (body.formData) {
      existing.formData = { ...(existing.formData || {}), ...body.formData };
      existing.status = 'consent_pending';
      existing.history = [
        ...(existing.history || []),
        { type: 'form_fill', message: 'Application form has been filled.' },
      ];
      await updateApplication(existing.id, existing);

      return NextResponse.json({
        application: existing,
        response: {
          message: generateConsentPrompt(existing.serviceType, language),
          nextStep: 'consent',
          requirements: [],
        },
      });
    }

    if (body.consent !== undefined) {
      if (body.consent === false) {
        existing.status = 'draft';
        existing.history = [
          ...(existing.history || []),
          { type: 'consent', message: 'Citizen cancelled submission. Draft saved.' },
        ];
        await updateApplication(existing.id, existing);

        return NextResponse.json({
          application: existing,
          response: {
            message: 'Submission cancelled. You can update details and submit later.',
            nextStep: 'draft',
          },
        });
      }

      const portalRef = `GOV-${existing.id.slice(0, 8).toUpperCase()}`;
      const finalStatus = Math.random() > 0.4 ? 'approved' : 'processing';
      existing.portalRef = portalRef;
      existing.status = finalStatus;
      existing.history = [
        ...(existing.history || []),
        { type: 'portal_submission', message: `Application submitted to mock portal. Ref: ${portalRef}` },
      ];
      await updateApplication(existing.id, existing);

      return NextResponse.json({
        application: existing,
        response: {
          message: `Application submitted successfully. Tracking ID: ${portalRef}. Current status: ${finalStatus}.`,
          nextStep: 'tracking',
        },
      });
    }

    return NextResponse.json({
      application: existing,
      response: {
        message: 'Your workflow is still active. Please continue with the next required step.',
        nextStep: 'continue',
      },
    });
  }

  const serviceType = detectServiceType(message) || 'income';
  const config = getServiceConfig(serviceType);
  const app = {
    id: `SEVA-${Date.now().toString().slice(-6)}`,
    citizenName,
    serviceType,
    status: 'documents_needed',
    documents: {},
    formData: {},
    createdAt: new Date().toISOString(),
    history: [
      { type: 'created', message: `AI identified service as ${config.label[language] || config.label.en}.` },
    ],
  };

  await createApplication(app);

  return NextResponse.json({
    application: app,
    response: {
      message: `I have identified the request as ${config.label[language] || config.label.en}. Please add the following documents to continue.`,
      nextStep: 'documents',
      requirements: config.docs,
    },
  });
}
