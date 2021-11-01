enum ResponseMimeEnum {
  html = 'text/html',
  txt = 'text/plain',
  css = 'text/css',
  gif = 'image/gif',
  jpg = 'image/jpeg',
  png = 'image/png',
  svg = 'image/svg+xml',
  js = 'application/javascript'
}

export function getMimeType(type: string): string {
  return ResponseMimeEnum[type as keyof typeof ResponseMimeEnum];
}
