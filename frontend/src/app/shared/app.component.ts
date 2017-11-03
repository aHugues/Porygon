import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles: ['../../styles.css'],
  template: `<nav>
                    <a routerLink="/porygon" routerLinkActive="active">Porygon</a>
            </nav>
            <router-outlet></router-outlet>`,
})
export class AppComponent  { name = 'Angular'; }
