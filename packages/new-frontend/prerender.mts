import {readFileSync, readdirSync} from 'node:fs';
import {outputFileSync} from 'fs-extra/esm';
import {resolve, join} from 'node:path';
import {createServer as createViteServer} from 'vite';
import dirname from 'es-dirname';

const __dirname = dirname();

const toAbsolute = (p: string) => resolve(__dirname, p);

const template = readFileSync(toAbsolute('client/index.html'), 'utf-8');

const routesToPrerender = readdirSync(toAbsolute('../src/routes')).filter(file => !file.includes(':')).reduce((prev, file) => {
  if (!file.match(/\.ts$/)) {
    return prev;
  }
  const name = file.replace(/\.ts$/, '');
  return [
    ...prev,
    name === 'index' ? `/` : `/${name}`
  ];
}, []);
(async () => {
  const vite = await createViteServer({
    appType: 'custom',
    logLevel: 'error',
    configFile: `${process.cwd()}/vite.config.production.ts`
  });
  const {SSRRender} = await vite.ssrLoadModule(join(__dirname, './server/entry-server.js'));
  for (const url of routesToPrerender) {
    const appHtml = SSRRender(url);
    const html = template.replace(`<!--app-html-->`, appHtml);
    const filePath = `client${url === '/' ? '/index' : `${url}/index`}.html`;
    outputFileSync(toAbsolute(filePath), html);
    console.info('pre-rendered:', filePath);
  }
  process.exit(0);
})();
