import { ENV } from '../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_DOMAIN: 'melisadaycare.auth0.com', // e.g., kmaida.auth0.com
  AUDIENCE: 'http://localhost:8083/api/', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile email',
  NAMESPACE: 'http://myapp.com/roles',
 

  CLIENT_ID: 'QTV1iwIaZoRw6rQGFpxN4Eppsr3k7nbt'
  // domain: 'melisadaycare.auth0.com',
  // responseType: 'token id_token',
  // redirectUri: 'http://localhost:3000/callback',
  // scope: 'openid'
};
