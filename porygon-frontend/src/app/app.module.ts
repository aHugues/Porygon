import { NgModule }      from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { PorygonModule } from './porygon/porygon.module';

import { AppComponent }  from './app.component';

import { SharingService } from './porygon/sharing.service';


@NgModule({
  imports:      [
      NgbModule.forRoot(),
      PorygonModule,
      RouterModule.forRoot([
      ]),
      BrowserModule,
      HttpModule,
  ],
  declarations: [
      AppComponent,
  ],
  bootstrap:    [ AppComponent ],

  exports: [
      RouterModule,
  ]
})
export class AppModule { }
