export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);

  // Strip '/api' so /api/v1 becomes /v1 for OpenAI
  const cleanPath = url.pathname.replace(/^\/api/, '');
  const targetUrl = new URL(cleanPath + url.search, 'https://api.openai.com');

  const headers = new Headers(req.headers);
  headers.set('host', 'api.openai.com');

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  });

  return response;
}
