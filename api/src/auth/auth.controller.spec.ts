import { resolveFrontendUrl } from './frontend-url';

describe('resolveFrontendUrl', () => {
  it('uses FRONTEND_URL when it is configured', () => {
    const req = {
      headers: {},
      protocol: 'http',
      get: jest.fn().mockReturnValue('api.example.com'),
    } as any;

    expect(
      resolveFrontendUrl(req, {
        FRONTEND_URL: 'https://admin.example.com',
      }),
    ).toBe('https://admin.example.com');
  });

  it('falls back to forwarded headers when the configured frontend URL is localhost', () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'admin.example.com',
      },
      protocol: 'http',
      get: jest.fn(),
    } as any;

    expect(resolveFrontendUrl(req, { FRONTEND_URL: 'http://localhost:5173' })).toBe('https://admin.example.com');
  });

  it('falls back to forwarded headers when no frontend URL is configured', () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'admin.example.com',
      },
      protocol: 'http',
      get: jest.fn(),
    } as any;

    expect(resolveFrontendUrl(req, {})).toBe('https://admin.example.com');
  });
});
