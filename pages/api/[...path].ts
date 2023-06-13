import { createProxyServer } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  req.headers.cookie = '';

  proxy.web(req, res, {
    target: process.env.PROXY_URL,
    changeOrigin: true,
    selfHandleResponse: false,
  });
}
