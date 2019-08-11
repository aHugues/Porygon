import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private kcService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.kcService.getToken() || '';
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${authToken}`,
      }
    });
    return next.handle(request);
  }
}
