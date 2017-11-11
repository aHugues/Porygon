import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
})
export class ListComponent {

    tabReady = true;
    selectedTab = "movies";

    onTabChange(event: any): void {
        // might do something later
    }

}
