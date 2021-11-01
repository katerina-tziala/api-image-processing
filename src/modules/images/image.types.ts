export enum ImageFormat {
  gif = 'gif',
  heif = 'heif',
  jpeg = 'jpeg',
  jpg = 'jpg',
  png = 'png',
  svg = 'svg',
  tiff = 'tiff',
  webp = 'webp'
}

export interface ImageOptions {
  name: string;
  format: ImageFormat;
  flip: boolean;
  flop: boolean;
  rotate: number;
  width?: number | undefined;
  height?: number | undefined;
}
