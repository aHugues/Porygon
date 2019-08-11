import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Location } from '../../models/location';
import { Movie } from '../../models/movie';
import { Serie } from '../../models/serie';

import { MovieDetailsComponent } from '../movies/movie-details.component';
import { SerieDetailsComponent } from '../series/serie-details.component';

import { PorygonService } from '../../services/porygon.service';

import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'location-details',
    templateUrl: './location-details.component.html',
    styleUrls: ['../../styles/card.css', '../../styles/forms.css', '../../styles/lists.css']
})
export class LocationDetailsComponent implements OnInit {

    newResource: Boolean;
    requestedId: number;

    numberPerPage = 5;
    pageSizeOptions = [5];

    moviePage = 1;
    seriePage = 1;

    numberOfMovies = 0;
    numberOfSeries = 0;

    selectedLocation: Location = new Location();

    moviesList: Movie[];
    seriesList: Serie[];

    ready = false;
    submitted = false;

    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<LocationDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.newResource = data.newResource;
        this.requestedId = data.id;
    }

    ngOnInit(): void {
        if (this.newResource) {
            this.setCurrentLocation(new Location());
        }
        else {
            this.porygonService.getLocation(this.requestedId)
                .subscribe(
                    (result: Location) => this.setCurrentLocation(result[0]),
                    (error: any) => console.error(error)
                );
        }
    }


    setCurrentLocation(location: Location): void {
        this.selectedLocation = location;
        this.porygonService.countElementsInLocation(location.id, "callback string")
            .subscribe(
                (result: any) => {
                    this.numberOfMovies = result["movies"];
                    this.numberOfSeries = result["series"];
            })
        this.porygonService.getMoviesInLocation(location.id, this.numberPerPage, this.moviePage)
            .subscribe(movies => this.moviesList = movies);
        this.porygonService.getSeriesInLocation(location.id, this.numberPerPage, this.seriePage)
            .subscribe(series => this.seriesList = series);
    }


    onSubmit(): void {
        if (this.newResource) {
            this.porygonService.createLocation(this.selectedLocation)
                .subscribe(
                    (result: Location) => this.handleSubmission(),
                    error => console.error(error)
                );
        }
        else {
            this.porygonService.modifyLocation(this.selectedLocation)
                .subscribe(
                    (result: Boolean) => this.handleSubmission(),
                    error => console.error()
                );
        }
    }

    onDelete(): void {
        this.porygonService.deleteLocation(this.selectedLocation)
            .subscribe(
                (result: Location) => this.handleSubmission(),
                error => console.error()
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.dialogRef.close();
    }

    changeMoviePage(): void {
        this.porygonService.getMoviesInLocation(this.selectedLocation.id, this.numberPerPage, this.moviePage)
            .subscribe(
                (result: Movie[]) => this.moviesList=result,
                error => console.error(error)
            );
    }

    onSeriePageChanged(event: any): void {
        this.seriePage = event.pageIndex + 1;
        this.porygonService.getSeriesInLocation(this.selectedLocation.id, this.numberPerPage, this.seriePage)
            .subscribe(
                (result: Serie[]) => this.seriesList = result,
                error => console.error(error)
            );
    }

    openMovieEditingDialog(id: number): void {
        let movieEditingDialog = this.dialog.open(MovieDetailsComponent, {
            width: '40%',
            data: { id: id, newResource: false}
        })

        movieEditingDialog.afterClosed().subscribe((result: any) => {
            this.ngOnInit();
        })
    }

    openSerieEditingDialog(id: number): void {
        let serieEditingDialog = this.dialog.open(SerieDetailsComponent, {
            width: '40%',
            data: { id: id, newResource: false}
        })

        serieEditingDialog.afterClosed().subscribe((result: any) => {
            this.ngOnInit();
        })
    }

    onEditMovie(id: number): void {
        this.openMovieEditingDialog(id);
    }

    onEditSerie(id: number): void {
        this.openSerieEditingDialog(id);
    }

    get diagnostic() { return JSON.stringify(this.selectedLocation)}

}
