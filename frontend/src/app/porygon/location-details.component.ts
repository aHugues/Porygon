import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Location } from './location';
import { Movie } from './movie';
import { Serie } from './serie';

import { PorygonService } from './porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'location-details',
    templateUrl: './location-details.component.html',
})
export class LocationDetailsComponent implements OnInit {

    numberPerPage = 5;
    moviePage = 1;
    seriePage = 1;

    numberOfMovies = 0;
    numberOfSeries = 0;

    selectedLocation: Location;

    moviesList: Movie[];
    seriesList: Serie[];

    ready = false;
    submitted = false;

    constructor(
        private porygonService: PorygonService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.porygonService.getLocation(+params.get('id')))
            .subscribe(location => this.setCurrentLocation(location));
    }

    setCurrentLocation(location: Location): void {
        this.selectedLocation = location;
        this.porygonService.countElementsInLocation(location.id, "callback string")
            .subscribe(
                (result: any) => {
                    this.numberOfMovies = result["movies"];
                    this.numberOfSeries = result["series"];
                    this.ready = true;
            })
        this.porygonService.getMoviesInLocation(location.id, this.numberPerPage, this.moviePage)
            .subscribe(movies => this.moviesList = movies);
        this.porygonService.getSeriesInLocation(location.id, this.numberPerPage, this.seriePage)
            .subscribe(series => this.seriesList = series);
    }

    onSubmit(): void {
        this.porygonService.modifyLocation(this.selectedLocation)
            .subscribe(
                (result: Boolean) => this.handleSubmission(),
                error => console.error()
            );
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
        this.router.navigate(['porygon/list']);
    }

    changeMoviePage(): void {
        this.porygonService.getMoviesInLocation(this.selectedLocation.id, this.numberPerPage, this.moviePage)
            .subscribe(
                (result: Movie[]) => this.moviesList=result,
                error => console.error(error)
            );
    }

    changeSeriePage(): void {
        this.porygonService.getSeriesInLocation(this.selectedLocation.id, this.numberPerPage, this.seriePage)
            .subscribe(
                (result: Serie[]) => this.seriesList = result,
                error => console.error(error)
            );
    }

    get diagnostic() { return JSON.stringify(this.selectedLocation)}

}
