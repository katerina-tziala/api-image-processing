import { ImageOptions, ImageFormat } from '../../../modules/images/image.types';
import {
  getRotationDegrees,
  getDimension,
  generateThumbName
} from '../../../modules/images/utils';

const rotateOptions: ImageOptions = {
  name: 'santamonica',
  format: ImageFormat.jpg,
  flip: false,
  flop: false,
  rotate: 20,
  width: undefined,
  height: undefined
};
const options: ImageOptions = {
  name: 'santamonica',
  format: ImageFormat.png,
  flip: true,
  flop: true,
  rotate: 30,
  width: 200,
  height: 100
};

describe('Test the getRotationDegrees function: ', () => {
  it('returns 0 when parameter is not defined', () => {
    expect(getRotationDegrees(undefined)).toBe(0);
  });

  it('returns 0 when parameter is passed as "foo"', () => {
    expect(getRotationDegrees('foo')).toBe(0);
  });

  it('returns 20 when parameter is passed as "20"', () => {
    expect(getRotationDegrees('20')).toBe(20);
  });
});

describe('Test the getDimension function: ', () => {
  it('returns undefined when parameter is not defined', () => {
    expect(getDimension(undefined)).toBeUndefined();
  });
  it('returns undefined when parameter is passed as "foo"', () => {
    expect(getDimension('foo')).toBeUndefined();
  });
  it('returns 25 when parameter is passed as "25.8"', () => {
    expect(getDimension('25.8')).toBe(25);
  });
});

describe('The generateThumbName function creates a thumb name based on the parameters', () => {
  const rotateOptionsName = 'thumb-santamonica-deg(20).jpg';
  const fullOptionsName = 'thumb-santamonica-w200-h100-deg(30)-flip-flop.png';
  it(`returns ${rotateOptionsName} for the options: ${JSON.stringify(
    rotateOptions
  )}`, () => {
    expect(generateThumbName(rotateOptions)).toEqual(rotateOptionsName);
  });

  it(`returns ${fullOptionsName} for the options: ${JSON.stringify(
    options
  )}`, () => {
    expect(generateThumbName(options)).toEqual(fullOptionsName);
  });
});
