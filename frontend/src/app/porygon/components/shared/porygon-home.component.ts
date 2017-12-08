import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'porygon',
    templateUrl: './porygon-home.component.html',
})
export class PorygonHomeComponent {

    public constructor (
        private titleService: Title
    ) {
        this.titleService.setTitle("Porygon - Home");
    }

}
