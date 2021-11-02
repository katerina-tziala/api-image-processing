import { promises as fsAsync } from 'fs';

export async function checkDirectory(directory: string): Promise<unknown> {
  try {
    await fsAsync.access(directory);
    return;
  } catch {
    await fsAsync.mkdir(directory);
    return;
  }
}
