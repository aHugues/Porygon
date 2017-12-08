import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  styles: ['../../styles.css'],
  template: `<nav>
                    <a routerLink="/porygon" routerLinkActive="active">Porygon</a>
            </nav>
            <router-outlet></router-outlet>`,
})
export class AppComponent  {

    public constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle("Gondolin Web Server");
    }


    name = 'Angular';

}
