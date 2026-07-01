import type { Request } from 'express';

export function resolveFrontendUrl(
  req: Request,
  env: Record<string, string | undefined> = process.env,
) {
  const forwardedProto =
    req.headers['x-forwarded-proto']?.toString() || req.protocol;
  const forwardedHost =
    req.headers['x-forwarded-host']?.toString() || req.get('host');

  const configuredFrontendUrl = env.FRONTEND_URL?.trim();
  const isLocalFrontendUrl =
    configuredFrontendUrl && /^(http:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredFrontendUrl);

  if (configuredFrontendUrl && !isLocalFrontendUrl) {
    return configuredFrontendUrl.replace(/\/$/, '');
  }

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, '');
  }

  if (configuredFrontendUrl) {
    return configuredFrontendUrl.replace(/\/$/, '');
  }

  return 'http://localhost:5173';
}
