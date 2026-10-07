import { NextResponse } from 'next/server';
import { readApplications } from '@/lib/store';

export async function GET() {
  const applications = await readApplications();
  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();
  const app = {
    id: `SEVA-${Date.now().toString().slice(-6)}`,
    citizenName: body.citizenName || 'Citizen',
    serviceType: body.serviceType || 'income',
    status: body.status || 'submitted',
    portalRef: body.portalRef || `GOV-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    history: body.history || [
      { type: 'submitted', message: 'Application submitted to mock portal.' },
    ],
  };

  const existing = await readApplications();
  existing.unshift(app);
  await require('@/lib/store').writeApplications(existing);

  return NextResponse.json(app);
}
