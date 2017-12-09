import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Serie } from '../../models/serie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'serie-details',
    templateUrl: './serie-details.component.html',
    styleUrls: ['../../styles/card.css', '../../styles/forms.css', '../../styles/lists.css']
})
export class SerieDetailsComponent implements OnInit {

    newResource: Boolean;
    requestedId: number;

    selectedSerie: Serie = new Serie();
    locationsList: Location[] = [new Location()];

    ready = false;
    submitted = false;


    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<SerieDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.newResource = data.newResource;
        this.requestedId = data.id;
    }

    ngOnInit(): void {
        if (this.newResource) {
            this.setCurrentSerie(new Serie());
        }
        else {
            this.porygonService.getSerie(this.requestedId)
                .subscribe(
                    (result: Serie) => this.setCurrentSerie(result),
                    (error) => console.error(error)
                );
        }
        this.porygonService.getLocationsList()
            .subscribe(
                (result: Location[]) => this.setLocationsList(result),
                error => console.error(error)
            );
    }

    setLocationsList(locations: Location[]): void {
        this.locationsList = locations;
    }

    setCurrentSerie(serie: Serie): void {
        this.selectedSerie = serie;
        this.ready = true;
    }

    onSubmit(): void {
        if (this.newResource) {
            this.porygonService.createSerie(this.selectedSerie)
                .subscribe(
                    (result: any) => this.handleSubmission(),
                    error => console.error(error)
                )
        }
        else {
            this.porygonService.modifySerie(this.selectedSerie)
                .subscribe(
                    (result: any) => this.handleSubmission(),
                    error => console.error(error)
                );
        }
    }

    onDelete(): void {
        this.porygonService.deleteSerie(this.selectedSerie)
            .subscribe(
                (result: any) => this.handleSubmission(),
                error => console.error(error)
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.dialogRef.close();
    }

}
