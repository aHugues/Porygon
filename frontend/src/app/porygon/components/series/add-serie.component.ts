import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Serie } from '../../models/serie';
import { Location as SerieLocation } from '../../models/location' ;

import { PorygonService } from '../../services/porygon.service';

@Component({
    selector: 'add-serie',
    templateUrl: './add-serie.component.html',
    styleUrls: ['../../../styles/forms.css'],
})
export class AddSerieComponent implements OnInit{

    newSerie = new Serie();
    locationsList: SerieLocation[];
    submitted = false;
    ready = false;

    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.porygonService.getLocationsList()
            .subscribe(
                (result: SerieLocation[]) => this.setLocationsList(result),
                error => console.error(error)
            );
    }

    setLocationsList(locations: SerieLocation[]): void {
        this.locationsList = locations;
        this.ready = true;
    }

    onSubmit(): void {
        this.porygonService.createSerie(this.newSerie)
            .subscribe(
                (result: any) => this.handleSubmission(),
                error => console.error()
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.router.navigate(['/porygon/list']);
    }

    get diagnostic() { return JSON.stringify(this.newSerie);}
}
