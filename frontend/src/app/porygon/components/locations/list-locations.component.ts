import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Location } from '../../models/location';
import { Stats } from '../../models/stats';

import { PorygonService } from '../../services/porygon.service';
import { LocationDetailsComponent } from './location-details.component';

@Component({
    selector: 'list-locations',
    templateUrl: './list-locations.component.html',
    styleUrls: ['../../styles/lists.css', '../../styles/card.css']
})
export class ListLocationsComponent implements OnInit {

    locationsList: Location[] = [];
    stats = new Stats();
    currentPageIndex = 0;

    constructor(
        private porygonService: PorygonService,
        public dialog: MatDialog

    ) {}

    ngOnInit(): void {
        this.porygonService.getLocationsList()
            .subscribe(
                (locations: Location[]) => this.setLocationsList(locations),
                error => console.error(error)
            );
    }

    setLocationsList(locations: Location[]) : void {
        this.locationsList = locations;
        this.locationsList.forEach ((location) => {
            // using "0" index for now
            // TODO remove index parameter in the service function
            this.porygonService.countElementsInLocation(location.id, "0")
                .subscribe(
                    (result: any) => {
                        location.movies = result["movies"];
                        location.series = result["series"];
                })
        });
    }

    onNewLocation(): void {
        this.openEditingDialog(-1, true);
    }

    onEditLocation(id: number) {
        this.openEditingDialog(id, false);
    }

    openEditingDialog(id: number, newResource: Boolean) {
        let editingDialog = this.dialog.open(LocationDetailsComponent, {
            width: '60%',
            panelClass: 'grey-dialog',
            data: { id: id, newResource: newResource }
        });

        editingDialog.afterClosed().subscribe((result: any) => {
            this.ngOnInit();
        })
    }

}
