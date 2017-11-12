import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Movie } from '../../models/movie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['../../../styles/card.css', '../../../styles/forms.css', '../../../styles/lists.css']
})
export class MovieDetailsComponent implements OnInit {

    newResource: Boolean;

    selectedMovie: Movie = new Movie();
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
                    let newMovie = new Movie();
                    newMovie.Location = new Location();
                    this.setCurrentMovie(newMovie);
                }
                else {
                    this.route.paramMap
                        .switchMap((params: ParamMap) => this.porygonService.getMovie(+params.get('id')))
                        .subscribe(movie => this.setCurrentMovie(movie));
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

    setCurrentMovie(movie: Movie): void {
        this.selectedMovie = movie;
        this.ready = true;
    }

    onSubmit(): void {
        this.selectedMovie.location = this.selectedMovie.Location.id.toString();
        if (this.newResource) {
            this.porygonService.createMovie(this.selectedMovie)
                .subscribe(
                    (result: any) => this.handleSubmission(),
                    error => console.error(error)
                )
        }
        else {
            this.porygonService.modifyMovie(this.selectedMovie)
                .subscribe(
                    (result: any) => this.handleSubmission(),
                    error => console.error(error)
                );
        }
    }

    onDelete(): void {
        this.porygonService.deleteMovie(this.selectedMovie)
            .subscribe(
                (result: Movie) => this.handleSubmission(),
                error => console.error(error)
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.router.navigate(['porygon/list']);
    }

    get diagnostic() { return JSON.stringify(this.selectedMovie) }

}
