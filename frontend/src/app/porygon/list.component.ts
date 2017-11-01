import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { Movie } from './movie';
import { Serie } from './serie';
import { Stats } from './stats';
import { Location as Position } from './location';

import { PorygonService } from './porygon.service';
import { PorygonSearchService } from './porygon-search.service';
import { SharingService } from './sharing.service';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

    numberPerPage: number;

    moviesList: Movie[] = [];
    seriesList: Serie[] = [];
    positionsList: Position[] = [];
    stats = new Stats();

    movieSearch: string;
    serieSearch: string;

    currentMoviePage: number;
    currentSeriePage: number;

    movieOffset: number;
    serieOffset: number;

    sortDicionnary = {
        "1": "title",
        "-1": "-title",
        "2": "location",
        "-2": "-location",
        "3": "year",
        "-3": "-year",
    }

    // default value: ascending title
    movieSortNumber: number;
    serieSortNumber: number;

    movieQueryParameters: any;

    serieQueryParameters: any;

    selectedTab: string;

    moviePagingReady = false;
    seriePagingReady = false;
    tabReady = false;

    constructor(
        private porygonService: PorygonService,
        private porygonSearchService: PorygonSearchService,
        private sharingService: SharingService,
    ) {
        this.numberPerPage = sharingService.getData("numberPerPage");

        this.currentMoviePage = sharingService.getData("moviePage");
        this.currentSeriePage = sharingService.getData("seriePage");
        this.movieOffset = (this.currentMoviePage-1)*this.numberPerPage;
        this.serieOffset = (this.currentSeriePage-1)*this.numberPerPage;

        this.movieSortNumber = sharingService.getData("movieSortNumber");
        this.serieSortNumber = sharingService.getData("serieSortNumber");

        this.movieQueryParameters = sharingService.getData("movieQuery");
        this.serieQueryParameters = sharingService.getData("serieQuery");

        this.selectedTab = sharingService.getData("tab");
        this.tabReady = true;

    }

    ngOnInit(): void {
        this.porygonService.getMovies(this.movieQueryParameters)
            .subscribe(
                (result: Movie[]) => this.setMoviesList(result),
                error => console.error(error)
            );
        this.porygonService.getSeries(this.serieQueryParameters)
            .subscribe(
                (result: Serie[]) => this.setSeriesList(result),
                error => console.error(error)
            );
        this.porygonService.getLocationsList()
            .subscribe(
                (result: Position[]) => this.setPositionsList(result),
                error => console.error(error)
            );
        this.porygonService.countMovies(this.movieQueryParameters)
            .subscribe(
                (result: number) => {
                    this.stats.movies = result;
                    this.moviePagingReady = true;
                },
                error => console.error(error)
            );
        this.porygonService.countSeries(this.serieQueryParameters)
            .subscribe(
                (result: number) => {
                    this.stats.series = result;
                    this.seriePagingReady = true;
                },
                error => console.error(error)
            );
    }

    setMoviesList(movies: Movie[]): void {
        this.moviesList = movies;
    }

    setSeriesList(series: Serie[]): void {
        this.seriesList = series;
    }

    setPositionsList(positions: Position[]): void {
        this.positionsList = positions;
        for (var position_index in this.positionsList) {
            this.porygonService.countElementsInLocation(this.positionsList[position_index].id, position_index)
                .subscribe(
                    (result: any) => {
                        this.positionsList[result["index"]].movies = result["movies"];
                        this.positionsList[result["index"]].series = result["series"];
                })
        }
    }

    changeMoviePage(): void {
        console.log("movie page changed");
        this.movieOffset = (this.currentMoviePage-1)*this.numberPerPage;
        this.sharingService.setData("moviePage", this.currentMoviePage);
        this.sharingService.setData("movieOffset", this.movieOffset);
        this.movieQueryParameters.offset = this.movieOffset;
        this.sharingService.setData("movieQuery", this.movieQueryParameters);
        this.porygonService.getMovies(this.movieQueryParameters)
            .subscribe(
                (result: Movie[]) => this.setMoviesList(result),
                error => console.error(error)
            );
    }

    changeSeriePage(): void {
        console.log("serie page changed");
        this.serieOffset = (this.currentSeriePage-1)*this.numberPerPage;
        this.sharingService.setData("seriePage", this.currentSeriePage);
        this.sharingService.setData("serieOffset", this.serieOffset);
        this.serieQueryParameters.offset = this.serieOffset;
        this.sharingService.setData("serieQuery", this.serieQueryParameters);
        this.porygonService.getSeries(this.serieQueryParameters)
            .subscribe(
                (result: Serie[]) => this.setSeriesList(result),
                error => console.error(error)
            );
    }

    searchMovies(): void {
        this.movieQueryParameters.title = this.movieSearch;
        this.sharingService.setData("movieQuery", this.movieQueryParameters);
        this.porygonService.getMovies(this.movieQueryParameters)
            .subscribe(
                (result: Movie[]) => this.setMoviesList(result),
                error => console.error(error)
            );
        this.porygonService.countMovies(this.movieQueryParameters)
            .subscribe(
                (result: number) => this.stats.movies = result,
                error => console.error(error)
            );
    }

    searchSeries(): void {
        this.serieQueryParameters.title = this.serieSearch;
        this.sharingService.setData("serieQuery", this.serieQueryParameters);
        this.porygonService.getSeries(this.serieQueryParameters)
            .subscribe(
                (result: Serie[]) => this.setSeriesList(result),
                error => console.error(error)
            );
        this.porygonService.countSeries(this.serieQueryParameters)
            .subscribe(
                (result: number) => this.stats.series = result,
                error => console.error(error)
            );
    }

    calculateNewSortValue(oldValue: number, id: number) {
        if (Math.abs(oldValue)==id) {
            return -oldValue;
        }
        else {
            return id;
        }
    }

    onSortMovies(id: number) {
        let newSortValue = this.calculateNewSortValue(this.movieSortNumber, id);
        this.movieSortNumber = newSortValue;
        this.sharingService.setData("movieSortNumber", newSortValue);
        this.movieQueryParameters.sort = this.sortDicionnary[newSortValue];
        this.sharingService.setData("movieQuery", this.movieQueryParameters);
        this.searchMovies();
    }

    onSortSeries(id: number) {
        let newSortValue = this.calculateNewSortValue(this.serieSortNumber, id);
        this.serieSortNumber = newSortValue;
        this.sharingService.setData("serieSortNumber", newSortValue);
        this.serieQueryParameters.sort = this.sortDicionnary[newSortValue];
        this.sharingService.setData("serieQuery", this.serieQueryParameters);
        this.searchSeries();
    }

    onTabChange($event: NgbTabChangeEvent) {
        this.selectedTab = $event.nextId;
        this.sharingService.setData("tab", this.selectedTab);
    }



    get diagnostic() {return JSON.stringify(this.sharingService.getAllData())};

}
