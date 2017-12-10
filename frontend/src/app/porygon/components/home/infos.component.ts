import { Component, OnInit } from '@angular/core';

import { Movie } from '../../models/movie';
import { Serie } from '../../models/serie';
import { Location } from '../../models/location';

import { PorygonService } from '../../services/porygon.service';

@Component({
    selector: 'home-infos',
    templateUrl: './infos.component.html',
    styleUrls: ['../../styles/home.css']
})
export class HomeInfosComponent implements OnInit {

    moviesList: Movie[];
    seriesList: Serie[];
    locationsList: Location[];

    nMovies: number;
    nSeries: number;
    nLocations: number;

    constructor(
        private porygonService: PorygonService
    ) {}

    ngOnInit(): void {
        this.porygonService.getMoviesList()
            .subscribe(
                (movies: Movie[]) => this.setMoviesList(movies),
                (error: any) => console.error(error)
            );

        this.porygonService.getSeriesList()
            .subscribe(
                (series: Serie[]) => this.setSeriesList(series),
                (error: any) => console.error(error)
            );

        this.porygonService.getLocationsList()
            .subscribe(
                (locations: Location[]) => this.setLocationsList(locations),
                (error: any) => console.error(error)
            );
    }

    setMoviesList(movies: Movie[]): void {
        this.moviesList = movies;
        this.nMovies = movies.length;
    }

    setSeriesList(series: Serie[]): void {
        this.seriesList = series;
        this.nSeries = series.length;
    }

    setLocationsList(locations: Location[]): void {
        this.locationsList = locations;
        this.nLocations = locations.length;
    }

}
