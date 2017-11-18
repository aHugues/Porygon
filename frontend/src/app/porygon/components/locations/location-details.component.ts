import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Location } from '../../models/location';
import { Movie } from '../../models/movie';
import { Serie } from '../../models/serie';

import { PorygonService } from '../../services/porygon.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'location-details',
    templateUrl: './location-details.component.html',
    styleUrls: ['../../styles/card.css', '../../styles/forms.css', '../../styles/lists.css']
})
export class LocationDetailsComponent implements OnInit {

    newResource: Boolean;

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
    ) {}

    ngOnInit(): void {
        this.route.data
            .subscribe((params) => {
                let newResource = params[0].newResource;
                this.newResource = newResource;
                if (newResource) {
                    this.setCurrentLocation(new Location());
                }
                else {
                    this.route.paramMap
                        .switchMap((params: ParamMap) => this.porygonService.getLocation(+params.get('id')))
                        .subscribe(location => this.setCurrentLocation(location));
                }
            })
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
        this.router.navigate(['porygon/list']);
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

    get diagnostic() { return JSON.stringify(this.selectedLocation)}

}
