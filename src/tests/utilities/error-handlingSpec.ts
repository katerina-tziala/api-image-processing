import { getErrorStatus } from '../../utilities/error-handling';

describe('Test the getErrorStatus function', () => {
  it('should return status code 404 when image is not found', () => {
    const error: Error = { name: '', message: 'image-not-found' };
    expect(getErrorStatus(error)).toBe(404);
  });
  it('should return status code 500 when image cannot be processed', () => {
    const error: Error = { name: '', message: 'image-could-not-be-processed' };
    expect(getErrorStatus(error)).toBe(500);
  });
  it('should return status code 500 when an unknown error occurs', () => {
    const error: Error = { name: '', message: 'unknown error' };
    expect(getErrorStatus(error)).toBe(500);
  });
});
