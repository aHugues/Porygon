import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  public keycloakAuth: any;

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': 'https://keycloak.aurelienhugues.com/auth',
        'realm': 'home',
        'clientId': 'porygon-public',
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve();
        })
        .error(()  => {
          reject();
        });
    });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }
}
