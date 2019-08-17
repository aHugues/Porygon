import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Movie } from '../../models/movie';

import { PorygonService } from '../../services/porygon.service';
import { MovieDetailsComponent } from './movie-details.component';

@Component({
    selector: 'list-movies',
    templateUrl: './list-movies.component.html',
    styleUrls: ['../../styles/lists.css', '../../styles/card.css']
})
export class ListMoviesComponent implements OnInit {

    @Input() location: string;

    moviesList: Movie[] = [];
    moviesListPage: Movie[] = [];
    pageSizeOptions = [10];
    pageSize = this.pageSizeOptions[0];
    currentPageIndex = 0;
    listLength = 0;
    query = {
        title: "",
        location: "",
        sort: "title"
    };

    // possible search parameters for the list
    sortDictionnary = {
        "1": "title",
        "-1": "-title",
        "2": "location",
        "-2": "-location",
        "3": "year",
        "-3": "-year",
        "4": "duration",
        "-4": "-duration",
    }

    sortingParameter = 1;


    constructor(
        private porygonService: PorygonService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        if (this.location) {
            this.query.location = this.location;
        }
        this.porygonService.getMoviesList()
            .subscribe(
                (movies: Movie[]) => this.setMoviesList(movies),
                (error: any) => console.error(error)
            );
    }

    setMoviesList(movies: Movie[]) : void {
        this.listLength = movies.length;
        this.moviesList = movies;
        this.updateDisplayedList();
    }

    updateDisplayedList(): void {
        let firstElement = this.currentPageIndex * this.pageSize;
        let lastElement = firstElement + this.pageSize;
        this.moviesListPage = this.moviesList.slice(firstElement, lastElement);
    }

    onPageChange(event: any): void {
        this.currentPageIndex = event.pageIndex;
        this.updateDisplayedList();
    }

    searchMovies(): void {
        this.porygonService.getMovies(this.query)
            .subscribe(
                (movies: Movie[]) => {
                    this.setMoviesList(movies);
                },
                (error: any) => console.error(error)
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
        let newSortValue = this.calculateNewSortValue(this.sortingParameter, id);
        this.sortingParameter = newSortValue;
        this.query.sort = this.sortDictionnary[newSortValue];
        this.searchMovies();
    }

    onNewMovie(): void {
        this.openEditingDialog(-1, true);
    }

    onEditMovie(id: number): void {
        this.openEditingDialog(id, false);
    }

    openEditingDialog(id: number, newResource: Boolean) {
        let editingDialog = this.dialog.open(MovieDetailsComponent, {
            width: '60%',
            data: { id: id, newResource: newResource }
        })

        editingDialog.afterClosed().subscribe((result: any) => {
            this.ngOnInit();
        })
    }



}
