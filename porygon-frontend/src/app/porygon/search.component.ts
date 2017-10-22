import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from './location';
import { Movie } from './movie';
import { Serie } from './serie';

import { PorygonService } from './porygon.service';
import { PorygonSearchService } from './porygon-search.service';


@Component({
    selector: 'search',
    templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

    numberPerPage = 10;

    locationsList: Location[];
    submitted = false;

    // search parameters
    title: string;
    location: string;
    director: string;
    actors: string;
    season: number;
    isMovie = false;
    isSerie = false;

    // results
    moviesList: Movie[];
    seriesList: Serie[];

    constructor(
        private porygonService: PorygonService,
        private porygonSearchService: PorygonSearchService,
    ) {}

    ngOnInit(): void {
        this.porygonService.getLocationsList()
            .subscribe(
                (locations: Location[]) => this.locationsList = locations
            );
    }

    canReset(): Boolean {
        return (
            this.isMovie ||
            this.isSerie ||
            this.title!=undefined ||
            this.location!=undefined ||
            this.director!=undefined ||
            this.actors!=undefined ||
            this.season!=undefined
        )
    }

    onReset(): void {
        this.title = undefined;
        this.location = undefined;
        this.director = undefined;
        this.actors = undefined;
        this.season = undefined;
        this.isMovie = false;
        this.isSerie = false;
    }

    onSubmit(): void {
        if (this.isMovie) {
            this.searchMovie();
            this.submitted = true;
        }
        if (this.isSerie) {
            this.searchSerie();
            this.submitted = true;
        }
    }

    searchMovie(): void {
        var search_query = {
            title: this.title,
            location: this.location,
            director: this.director,
            actors: this.actors,
        };
        this.porygonSearchService.advancedMovieSearch(search_query)
            .subscribe(
                ((result: Movie[]) => this.moviesList = result)
            )
    }


    searchSerie(): void {
        var search_query = {
            title: this.title,
            location: this.location,
            season: this.season,
        };
        this.porygonSearchService.advancedSerieSearch(search_query)
            .subscribe(
                ((result: Serie[]) => this.seriesList = result)
            )
    }

}
