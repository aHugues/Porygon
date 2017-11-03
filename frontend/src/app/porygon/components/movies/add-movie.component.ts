import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../models/movie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

@Component({
    selector: 'add-movie',
    templateUrl: './add-movie.component.html',
    styleUrls: ['../../../styles/forms.css',],
})
export class AddMovieComponent implements OnInit{

    newMovie = new Movie();
    locationsList: Location[];
    submitted = false;
    ready = false;

    constructor(
        private porygonService: PorygonService,
        private router: Router,
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
        this.ready = true;
    }

    onSubmit(): void {
        this.porygonService.createMovie(this.newMovie)
            .subscribe(
                (result: Movie) => this.handleSubmission(),
                error => console.error()
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.router.navigate(['porygon/list']);
    }

    get diagnostic() { return JSON.stringify(this.newMovie);}

}
