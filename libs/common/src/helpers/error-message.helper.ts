export function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (
    typeof e === 'object' &&
    e &&
    'message' in e &&
    typeof (e as any).message === 'string'
  ) {
    return (e as any).message;
  }
  return 'Unknown error';
}
