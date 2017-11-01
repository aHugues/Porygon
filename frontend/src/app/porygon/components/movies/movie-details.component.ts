import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Movie } from '../../models/movie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {

    selectedMovie: Movie;
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
            .switchMap((params: ParamMap) => this.porygonService.getMovie(+params.get('id')))
            .subscribe(movie => this.setCurrentMovie(movie));
    }

    setCurrentMovie(movie: Movie): void {
        this.selectedMovie = movie;
        this.ready = true;
    }

    onSubmit(): void {
        this.porygonService.modifyMovie(this.selectedMovie)
            .subscribe(
                (result: any) => this.handleSubmission(),
                error => console.error()
            );
    }

    onDelete(): void {
        this.porygonService.deleteMovie(this.selectedMovie)
            .subscribe(
                (result: Movie) => this.handleSubmission(),
                error => console.error()
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.router.navigate(['porygon/list']);
    }

}
