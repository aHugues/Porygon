import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PorygonNavigationModel } from '../../models/porygon-navigation-model';
import { MatToolbarModule } from '@angular/material';

@Component({
    selector: 'porygon',
    templateUrl: './porygon.component.html',
    styleUrls: ['../../styles/navbar.css', '../../styles/global.css']
})
export class PorygonComponent {

    public constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle("Porygon");
    }


}
