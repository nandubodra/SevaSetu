import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'applications.json');

export async function ensureDataFile() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

export async function readApplications() {
  await ensureDataFile();
  const content = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(content || '[]');
}

export async function writeApplications(data: any[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function createApplication(app: any) {
  const data = await readApplications();
  data.unshift(app);
  await writeApplications(data);
  return app;
}

export async function findApplication(id: string) {
  const data = await readApplications();
  return data.find((item: any) => item.id === id) || null;
}

export async function updateApplication(id: string, next: any) {
  const data = await readApplications();
  const updated = data.map((item: any) => (item.id === id ? next : item));
  await writeApplications(updated);
  return next;
}
