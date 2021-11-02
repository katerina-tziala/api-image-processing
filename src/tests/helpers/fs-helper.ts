import { promises as fsAsync } from 'fs';
import path from 'path';

export async function textFileContent(filePath: string): Promise<string> {
  try {
    const data: Buffer = await fsAsync.readFile(filePath);
    const content: string = data.toString();
    return content;
  } catch {
    return '';
  }
}

export async function removeDirectory(directory: string): Promise<void> {
  try {
    await fsAsync.access(directory);
    await fsAsync.rmdir(directory);
    return;
  } catch {
    return;
  }
}

export async function clearDirectory(directory: string): Promise<void> {
  try {
    const files = await getFiles(directory);
    files.forEach(async (fileName: string) => {
      await removeFileFromDirectory(directory, fileName);
    });
  } catch {
    return;
  }
}

export async function removeFileFromDirectory(
  directory: string,
  fileName: string
): Promise<unknown> {
  try {
    const imagePath: string = path.resolve(`${directory}${fileName}`);
    await fsAsync.unlink(imagePath);
    return;
  } catch {
    return;
  }
}

async function getFiles(directory: string): Promise<string[]> {
  try {
    const files = await fsAsync.readdir(directory);
    return files;
  } catch {
    return [];
  }
}
