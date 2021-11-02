import { getResponseType } from '../../utilities/response-type';

describe('Test the getResponseType function', () => {
  it('should return text/plain when type is not specified correctly', () => {
    expect(getResponseType('')).toEqual('text/plain');
  });

  it('should return image/png when type is png', () => {
    expect(getResponseType('png')).toEqual('image/png');
  });
});
