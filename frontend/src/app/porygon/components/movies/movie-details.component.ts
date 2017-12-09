import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Movie } from '../../models/movie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['../../styles/card.css', '../../styles/forms.css', '../../styles/lists.css']
})
export class MovieDetailsComponent implements OnInit {

    newResource: Boolean;
    requestedId: number;

    selectedMovie: Movie;
    locationsList: Location[] = [new Location()];

    resourcesReady = 0;
    submitted = false;


    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<MovieDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.newResource = data.newResource;
        this.requestedId = data.id;
    }

    ngOnInit(): void {
        if (this.newResource) {
            this.setCurrentMovie(new Movie());
        }
        else {
            this.porygonService.getMovie(this.requestedId)
                .subscribe(
                    (result: Movie) => this.setCurrentMovie(result),
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
        this.resourcesReady ++;
    }

    setCurrentMovie(movie: Movie): void {
        this.selectedMovie = movie;
        this.resourcesReady ++;
    }

    onSubmit(): void {
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
        this.dialogRef.close();
    }

    get diagnostic() { return JSON.stringify(this.selectedMovie) }

}
