import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';


import { PorygonModule } from '../porygon/porygon.module';

import { AppComponent }  from './app.component';

import { SharingService } from '../porygon/services/sharing.service';


@NgModule({
  imports:      [
      BrowserAnimationsModule,
      PorygonModule,
      RouterModule.forRoot([
      ]),
      BrowserModule,
      HttpModule,
      MatToolbarModule
  ],
  declarations: [
      AppComponent,
  ],
  providers: [
      Title
  ],
  bootstrap:    [ AppComponent ],

  exports: [
      RouterModule,
      MatToolbarModule,
  ]
})
export class AppModule { }
