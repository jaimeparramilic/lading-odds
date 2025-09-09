// /lib/shopify.ts
import 'server-only';
import '@shopify/shopify-api/adapters/web-api';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const APP_URL = (process.env.APP_URL || '').replace(/\/+$/, '');
const API_KEY = process.env.SHOPIFY_API_KEY || '';
const RAW_SECRET = process.env.SHOPIFY_API_SECRET || '';
const SECRET = RAW_SECRET.replace(/\r?\n/g, '').trim();
const SCOPES = (process.env.SHOPIFY_SCOPES || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

if (!APP_URL || !API_KEY || !SECRET || SCOPES.length === 0) {
  throw new Error('Faltan envs: APP_URL / SHOPIFY_API_KEY / SHOPIFY_API_SECRET / SHOPIFY_SCOPES');
}

export const shopify = shopifyApi({
  apiKey: API_KEY,
  apiSecretKey: SECRET,
  scopes: SCOPES,
  apiVersion: LATEST_API_VERSION,
  hostName: new URL(APP_URL).host,
  hostScheme: new URL(APP_URL).protocol.replace(':','') as 'https' | 'http',
  isEmbeddedApp: false,
});

// === Helpers de clientes con un access token existente ===
export function restClient(shop: string, accessToken: string) {
  return new shopify.clients.Rest({
    session: {
      id: `${shop}_offline`,
      shop,
      state: 'unused',
      isOnline: false,
      scope: '',
      accessToken,
      expires: undefined,
    } as any,
  });
}


export function graphqlClient(shop: string, accessToken: string) {
  return new shopify.clients.Graphql({
    session: {
      id: `${shop}_offline`,
      shop,
      state: 'unused',
      isOnline: false,
      scope: '',
      accessToken,
      expires: undefined,
    } as any,
  });
}
