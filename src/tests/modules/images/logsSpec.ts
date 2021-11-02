import fs from 'fs';
import path from 'path';
import * as fsHelper from '../../helpers/fs-helper';
import { writeLogs, imageLogsPath } from '../../../modules/images/logs';
import { CONFIG } from '../../../config/config';

const thumbTest = 'thumb-test-foo.png';
const directory = path.normalize(CONFIG.LOGS_DIRECTORY);

const clearLogs = async () => {
  await fsHelper.clearDirectory(directory);
  await fsHelper.removeDirectory(directory);
};

describe('Test the writeLogs function', () => {
  beforeAll(async (): Promise<void> => clearLogs());

  it(`should create directory ${CONFIG.LOGS_DIRECTORY} and file thumbs-log.txt when they do not exist`, async () => {
    expect(fs.existsSync(directory)).toEqual(false);
    await writeLogs('', true);
    expect(fs.existsSync(directory)).toEqual(true);
    expect(fs.existsSync(imageLogsPath)).toEqual(true);
  });

  it(`should create line for processed thumb `, async () => {
    await writeLogs(thumbTest, true);
    const content = await fsHelper.textFileContent(imageLogsPath);
    expect(content).toContain(`[Processed] ${thumbTest}`);
  });

  it(`should create line for accessed thumb `, async () => {
    await writeLogs(thumbTest, false);
    const content = await fsHelper.textFileContent(imageLogsPath);
    expect(content).toContain(`[Accessed] ${thumbTest}`);
  });

  afterAll(async (): Promise<void> => clearLogs());
});
