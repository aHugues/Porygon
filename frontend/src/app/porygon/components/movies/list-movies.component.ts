import { Component, OnInit } from '@angular/core';

import { Movie } from '../../models/movie';

import { PorygonService } from '../../services/porygon.service';

@Component({
    selector: 'list-movies',
    templateUrl: './list-movies.component.html',
})
export class ListMoviesComponent implements OnInit {

    movies_list: Movie[] = [];

    constructor(private porygonService: PorygonService) {}

    ngOnInit(): void {
        this.porygonService.getMoviesList()
            .subscribe(
                (result: Movie[]) => this.set_movies_list(result),
                error => console.error(error)
            );
    }

    set_movies_list(movies: Movie[]) : void {
        this.movies_list = movies;
        console.log(this.movies_list);
    }
}
