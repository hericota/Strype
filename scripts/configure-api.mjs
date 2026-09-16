import { writeFileSync } from 'node:fs';
const value = process.env.API_URL;
if (!value) throw new Error('API_URL is required, including /produtos');
const url = new URL(value);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname.replace(/\/$/, '') !== '/produtos') throw new Error('API_URL must be https://your-api-host/produtos');
writeFileSync(new URL('../src/environments/environment.ts', import.meta.url), 'export const environment = ' + JSON.stringify({production:true,apiUrl:value.replace(/\/$/,'')}) + ';\n');
