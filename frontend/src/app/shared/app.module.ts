import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';


import { PorygonModule } from '../porygon/porygon.module';

import { AppComponent }  from './app.component';
import { PorygonComponent } from '../porygon/components/shared/porygon.component';

import { SharingService } from '../porygon/services/sharing.service';
import { KeycloakService } from './keycloak.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


export function kcFactory(keycloakService: KeycloakService) {
    return () => keycloakService.init();
}

@NgModule({
  imports:      [
      HttpClientModule,
      BrowserAnimationsModule,
      PorygonModule,
      RouterModule.forRoot([
      ]),
      BrowserModule,
      MatToolbarModule
  ],
  declarations: [
      AppComponent,
      PorygonComponent,
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
      },
      KeycloakService,
      {
          provide: APP_INITIALIZER,
          useFactory: kcFactory,
          deps: [KeycloakService],
          multi: true
      },
      Title,
  ],
  bootstrap:    [ AppComponent ],

  exports: [
      RouterModule,
      MatToolbarModule,
  ]
})
export class AppModule { }
