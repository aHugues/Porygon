import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Serie } from '../../models/serie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'serie-details',
    templateUrl: './serie-details.component.html',
})
export class SerieDetailsComponent implements OnInit {

    selectedSerie: Serie;
    locationsList: Location[];

    ready = false;
    submitted = false;



    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.porygonService.getLocationsList()
            .subscribe(
                (result: Location[]) => this.setLocationsList(result),
                error => console.error(error)
            );
    }

    setLocationsList(locations: Location[]): void {
        this.locationsList = locations;
        this.route.paramMap
            .switchMap((params: ParamMap) => this.porygonService.getSerie(+params.get('id')))
            .subscribe(serie => this.setCurrentSerie(serie));
    }

    setCurrentSerie(serie: Serie): void {
        this.selectedSerie = serie;
        this.ready = true;
    }

    onSubmit(): void {
        this.porygonService.modifySerie(this.selectedSerie)
            .subscribe(
                (result: any) => this.handleSubmission(),
                error => console.error()
            );
    }

    onDelete(): void {
        this.porygonService.deleteSerie(this.selectedSerie)
            .subscribe(
                (result: any) => this.handleSubmission(),
                error => console.error()
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.router.navigate(['porygon/list']);
    }

}
