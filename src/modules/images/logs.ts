import { promises as fsAsync } from 'fs';
import { CONFIG } from '../../config/config';

const LOGS_PATH = CONFIG.SERVER_LOGS;
const logsFilePath = `${LOGS_PATH}thumbs-log.txt`;

export async function writeLogs(thumbName: string, created: boolean): Promise<void> {
  await checkPath();
  const type = created ? 'Processed' : 'Accessed';
  const timestamp = new Date().toUTCString();
  const logsFile = await fsAsync.open(logsFilePath, 'a+');
  await logsFile.write(`\r\n [${type}] ${timestamp} - thumb: ${thumbName}`);
}

async function checkPath(): Promise<void> {
  try {
    await fsAsync.access(LOGS_PATH);
  } catch {
    fsAsync.mkdir(LOGS_PATH);
  }
}
