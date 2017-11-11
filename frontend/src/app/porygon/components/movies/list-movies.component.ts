import { Component, OnInit } from '@angular/core';

import { Movie } from '../../models/movie';

import { PorygonService } from '../../services/porygon.service';

@Component({
    selector: 'list-movies',
    templateUrl: './list-movies.component.html',
    styleUrls: ['../../../styles/lists.css', '../../../styles/card.css']
})
export class ListMoviesComponent implements OnInit {

    moviesList: Movie[] = [];
    moviesListPage: Movie[] = [];
    pageSizeOptions = [10];
    pageSize = this.pageSizeOptions[0];
    currentPageIndex = 0;
    listLength = 0;
    ready = false;

    constructor(private porygonService: PorygonService) {}

    ngOnInit(): void {
        this.porygonService.getMoviesList()
            .subscribe(
                (movies: Movie[]) => this.set_movies_list(movies),
                error => console.error(error)
            );
    }

    set_movies_list(movies: Movie[]) : void {
        this.listLength = movies.length;
        this.moviesList = movies;
        let firstElement = this.currentPageIndex * this.pageSize;
        let lastElement = firstElement + this.pageSize;
        this.moviesListPage = movies.slice(firstElement, lastElement);
        this.ready = true;
    }

    onPageChange(event: any): void {
        this.currentPageIndex = event.pageIndex;
        let firstElement = this.currentPageIndex * this.pageSize;
        let lastElement = firstElement + this.pageSize;
        this.moviesListPage = this.moviesList.slice(firstElement, lastElement);
    }
}
