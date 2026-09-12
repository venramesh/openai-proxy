export default async function handler(req, res) {
  const cleanPath = req.url.replace(/^\/api/, '');
  const targetUrl = 'https://api.openai.com' + cleanPath;

  const headers = { ...req.headers };
  headers.host = 'api.openai.com';
  delete headers['content-length'];

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.text();
  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'content-encoding') res.setHeader(key, value);
  });
  res.send(data);
}
