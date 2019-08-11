import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';
import { Serie } from '../models/serie';
import { Location } from '../models/location';
import { Stats } from '../models/stats';
import { Command } from '../models/command';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class PorygonService {

    private apiUrl = environment.apiUrl;
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `$(error.status) - ${error.statusTest}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


    getMoviesList(): any {
        const url = `${this.apiUrl}/movies`;
        return this.http.get(url)
    }

    getMovie(id: number): any {
        const url = `${this.apiUrl}/movies/${id}`;
        return this.http.get(url)
    }

    getMoviesPage(limit: number, page: number): any {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/movies?limit=${limit}&offset=${offset}`;
        return this.http.get(url)
    }

    getMoviesInLocation(id: number, limit: number, page: number): any {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/movies?limit=${limit}&offset=${offset}&location=${id}`;
        return this.http.get(url)
    }

    getSeriesList(): any {
        const url = `${this.apiUrl}/series`;
        return this.http.get(url)
    }

    getSerie(id: number): any {
        const url = `${this.apiUrl}/series/${id}`;
        return this.http.get(url)
    }

    getSeriesPage(limit: number, page: number): any {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/series/?limit=${limit}&offset=${offset}`;
        return this.http.get(url)
    }

    getSeriesInLocation(id: number, limit: number, page: number): any {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/series/?limit=${limit}&offset=${offset}&location=${id}`;
        return this.http.get(url)
    }

    getLocationsList(): any {
        const url = `${this.apiUrl}/locations`;
        return this.http.get(url)
    }

    getLocation(id: number): any {
        const url = `${this.apiUrl}/locations/${id}`;
        return this.http.get(url)
    }

    getStats(): any {
        const url = `${this.apiUrl}/list/stats`;
        return this.http.get(url)
    }

    getLocationStats(id: number): any {
        const url = `${this.apiUrl}/stats/location/${id}`;
        return this.http.get(url)
    }

    createMovie(movie: Movie): any {
        const url = `${this.apiUrl}/movies`;
        return this.http
            .post(url, JSON.stringify(movie), {headers: this.headers})
            .pipe(map(() => true))
    }

    modifyMovie(movie: Movie): Observable<any> {
        const url = `${this.apiUrl}/movies/${movie.id}`;
        movie.location = null;
        return this.http
            .put(url, JSON.stringify(movie), {headers: this.headers})
            .pipe(map(() => true))
    }

    deleteMovie(movie: Movie): Observable<any> {
        const url = `${this.apiUrl}/movies/${movie.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(map(() => true))
    }

    createSerie(serie: Serie): Observable<any> {
        const url = `${this.apiUrl}/series`;
        return this.http
            .post(url, JSON.stringify(serie), {headers: this.headers})
            .pipe(map(() => true))
    }

    modifySerie(serie: Serie): Observable<any> {
        const url = `${this.apiUrl}/series/${serie.id}`;
        return this.http
            .put(url, JSON.stringify(serie), {headers: this.headers})
            .pipe(map(() => true))
    }

    deleteSerie(serie: Serie): Observable<any> {
        const url = `${this.apiUrl}/series/${serie.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(map(() => true))
    }

    createLocation(location: Location): any {
        const url = `${this.apiUrl}/locations`;
        return this.http
            .post(url, JSON.stringify(location), {headers: this.headers})
    }

    modifyLocation(location: Location): Observable<any> {
        const url = `${this.apiUrl}/locations/${location.id}`;
        return this.http
            .put(url, JSON.stringify(location), {headers: this.headers})
            .pipe(map(() => true))
    }

    deleteLocation(location: Location): Observable<any> {
        const url = `${this.apiUrl}/locations/${location.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(map(() => true))
    }

    countMovies(query: any): any {
        const url = `${this.apiUrl}/movies/count/`;
        let params = {};
        if (query.title!=undefined) {
            params = query;
        }
        return this.http.get(url, { params: params })
    }

    countSeries(query: any): any {
        const url = `${this.apiUrl}/series/count/`;
        let params = {};
        if (query.title!=undefined) {
            params = query;
        }
        return this.http.get(url, { params: params })
    }

    countElementsInLocation(id: number, index: string): Observable<{movies: number, series: number, index: string}> {
        const url = `${this.apiUrl}/locations/${id}/count`;
        return this.http
            .get(url)
            .pipe(map((res: Response) => {
                var movies = res.json().movies;
                var series = res.json().series;
                return {movies: movies, series: series, index: index};
            }))
    }

    getCommandsList(): any {
        const url = `${this.apiUrl}/commands`;
        return this.http.get(url)
    }

    getCommand(id: number): any {
        const url = `${this.apiUrl}/commands/${id}`;
        return this.http.get(url)
    }

    createCommand(command: Command): Observable<any> {
        const url = `${this.apiUrl}/commands`;
        return this.http
            .post(url, JSON.stringify(command), {headers: this.headers})
            .pipe(map((res: Response) => res.json))
    }

    modifyCommand(command: Command): Observable<any> {
        const url = `${this.apiUrl}/commands/${command.id}`;
        return this.http
            .put(url, JSON.stringify(command), {headers: this.headers})
            .pipe(map(() => true))
    }

    deleteCommand(command: Command): Observable<any> {
        const url = `${this.apiUrl}/commands/${command.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(map(() => true))
    }

    getMovies(query: any): any {
         let params = query;
        const url = `${this.apiUrl}/movies`;
        return this.http.get(url, { params: params })
    }

    getSeries(query: any): any {
        let params = query;
        const url = `${this.apiUrl}/series`;
        return this.http.get(url, { params: params })
    }


}
