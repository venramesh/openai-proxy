export default async function handler(req, res) {
  const path = req.query.path || '';
  const targetUrl = 'https://api.openai.com/' + (Array.isArray(path) ? path.join('/') : path);

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
