enum ResponseType {
  html = 'text/html',
  txt = 'text/plain',
  css = 'text/css',
  gif = 'image/gif',
  jpg = 'image/jpeg',
  png = 'image/png',
  svg = 'image/svg+xml',
  js = 'application/javascript'
}

export function getResponseType(type: string): string {
  return ResponseType[type as keyof typeof ResponseType] || ResponseType.txt;
}
