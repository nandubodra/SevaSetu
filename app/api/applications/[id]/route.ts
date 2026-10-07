import { NextResponse } from 'next/server';
import { findApplication, readApplications, updateApplication } from '@/lib/store';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const app = await findApplication(params.id);
  if (!app) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ application: app });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const app = await findApplication(params.id);
  if (!app) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = {
    ...app,
    status: body.status || app.status,
    portalRef: body.portalRef || app.portalRef,
    history: [
      ...(app.history || []),
      { type: 'officer_update', message: body.note || `Officer updated status to ${body.status}` },
    ],
  };

  await updateApplication(app.id, updated);
  return NextResponse.json({ application: updated });
}
