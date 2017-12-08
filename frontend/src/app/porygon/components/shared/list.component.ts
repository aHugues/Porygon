import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['../../styles/tabs.css'],
})
export class ListComponent {

    tabReady = true;
    selectedTab = "movies";

    public constructor (
        private titleService: Title
    ) {
        this.titleService.setTitle("Porygon - List")
    }

    onTabChange(event: any): void {
        // might do something later
    }

}
