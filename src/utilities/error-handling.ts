enum ResponseStatusEnum {
  'image-not-found' = 404,
  'image-could-not-be-processed' = 500
}

export function getErrorStatus(error: Error): number {
  const status: number =
    ResponseStatusEnum[error.message as keyof typeof ResponseStatusEnum] || 500;
  return status;
}
