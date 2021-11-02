import { promises as fsAsync } from 'fs';
import { checkDirectory } from '../../utilities/utilities.module';
import { CONFIG } from '../../config/config';

export const imageLogsPath = `${CONFIG.LOGS_DIRECTORY}thumbs-log.txt`;

export async function writeLogs(
  thumbName: string,
  created: boolean
): Promise<unknown> {
  await checkDirectory(CONFIG.LOGS_DIRECTORY);
  const type = created ? 'Processed' : 'Accessed';
  const timestamp = new Date().toUTCString();
  const data = `\r\n${timestamp} - [${type}] ${thumbName}`;
  return await writeLogsData(data);
}

async function writeLogsData(data: string): Promise<unknown> {
  try {
    const logsFile = await fsAsync.open(imageLogsPath, 'a+');
    await logsFile.write(data);
    return;
  } catch {
    return;
  }
}
