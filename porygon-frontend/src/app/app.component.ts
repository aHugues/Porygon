import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<nav>
                    <a routerLink="/porygon" routerLinkActive="active">Porygon</a>
            </nav>
            <router-outlet></router-outlet>`,
})
export class AppComponent  { name = 'Angular'; }
