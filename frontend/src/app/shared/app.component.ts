import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  styles: ['../../styles.css'],
  template: `
  <porygon></porygon>
  <router-outlet></router-outlet>`,
})
export class AppComponent  {

    public constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle("Porygon");
    }


    name = 'Angular';

}
