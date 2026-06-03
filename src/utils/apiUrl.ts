export function getApiUrl(path: string): string {
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
     window.location.hostname === '127.0.0.1' ||
     window.location.hostname.endsWith('run.app'))
  ) {
    return path;
  }
  
  // Custom Cloud Run secure deployment endpoint
  const backendBase = 'https://ais-pre-27yzi4fngkyf2e6e7h7dfk-492683465904.asia-southeast1.run.app';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${backendBase}${cleanPath}`;
}
