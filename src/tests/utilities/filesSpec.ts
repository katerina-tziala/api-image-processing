import fs from 'fs';
import path from 'path';
import { checkDirectory } from '../../utilities/files';
import { removeDirectory } from '../helpers/fs-helper';

const directory = path.normalize('./foo');

describe('Test the checkDirectory function', () => {
  beforeAll(async (): Promise<void> => {
    await removeDirectory(directory);
  });

  it(`should create directory 'foo' when it does not exist`, async () => {
    expect(fs.existsSync(directory)).toEqual(false);
    await checkDirectory(directory);
    expect(fs.existsSync(directory)).toEqual(true);
  });

  afterAll(async (): Promise<void> => {
    await removeDirectory(directory);
  });
});
