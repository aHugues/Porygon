import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['../../styles/tabs.css'],
})
export class ListComponent {

    tabReady = true;
    selectedTab = "movies";

    onTabChange(event: any): void {
        // might do something later
    }

}
