import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Serie } from '../../models/serie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'serie-details',
    templateUrl: './serie-details.component.html',
    styleUrls: ['../../../styles/card.css', '../../../styles/forms.css', '../../../styles/lists.css']
})
export class SerieDetailsComponent implements OnInit {

    newResource: Boolean;

    selectedSerie: Serie = new Serie();
    locationsList: Location[] = [new Location()];

    ready = false;
    submitted = false;



    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.data
            .subscribe((params) => {
                let newResource = params[0].newResource;
                this.newResource = newResource;
                if (newResource) {
                    let newSerie = new Serie();
                    newSerie.Location = new Location();
                    this.setCurrentSerie(newSerie);
                }
                else {
                    this.route.paramMap
                        .switchMap((params: ParamMap) => this.porygonService.getSerie(+params.get('id')))
                        .subscribe(serie => this.setCurrentSerie(serie));
                }
            })
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
        this.selectedSerie.location = this.selectedSerie.Location.id.toString();
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
        this.router.navigate(['porygon/list']);
    }

}
