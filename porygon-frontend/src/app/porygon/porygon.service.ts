import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Movie } from './movie';
import { Serie } from './serie';
import { Location } from './location';
import { Stats } from './stats';
import { Command } from './command';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PorygonService {

    private apiUrl = "http://192.168.0.13:3000/api/v2";
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `$(error.status) - ${error.statusTest}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


    getMoviesList(): Observable<Movie[]> {
        const url = `${this.apiUrl}/movies`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getMovie(id: number): Observable<Movie> {
        const url = `${this.apiUrl}/movies/${id}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getMoviesPage(limit: number, page: number): Observable<Movie[]> {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/movies?limit=${limit}&offset=${offset}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getMoviesInLocation(id: number, limit: number, page: number): Observable<Movie[]> {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/movies?limit=${limit}&offset=${offset}&location=${id}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getSeriesList(): Observable<Serie[]> {
        const url = `${this.apiUrl}/series`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getSerie(id: number): Observable<Serie> {
        const url = `${this.apiUrl}/series/${id}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getSeriesPage(limit: number, page: number): Observable<Serie[]> {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/series/?limit=${limit}&offset=${offset}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
    }

    getSeriesInLocation(id: number, limit: number, page: number): Observable<Serie[]> {
        var offset = (page-1)*limit;
        const url = `${this.apiUrl}/series/?limit=${limit}&offset=${offset}&location=${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
    }

    getLocationsList(): Observable<Location[]> {
        const url = `${this.apiUrl}/locations`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getLocation(id: number): Observable<Location> {
        const url = `${this.apiUrl}/locations/${id}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getStats(): Observable<Stats> {
        const url = `${this.apiUrl}/list/stats`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getLocationStats(id: number): Observable<Stats> {
        const url = `${this.apiUrl}/stats/location/${id}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    createMovie(movie: Movie): Observable<any> {
        const url = `${this.apiUrl}/movies`;
        return this.http
            .post(url, JSON.stringify(movie), {headers: this.headers})
            .map(() => true)
    }

    modifyMovie(movie: Movie): Observable<any> {
        const url = `${this.apiUrl}/movies/${movie.id}`;
        return this.http
            .put(url, JSON.stringify(movie), {headers: this.headers})
            .map(() => true)
    }

    deleteMovie(movie: Movie): Observable<any> {
        const url = `${this.apiUrl}/movies/${movie.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .map(() => true)
    }

    createSerie(serie: Serie): Observable<any> {
        const url = `${this.apiUrl}/series`;
        return this.http
            .post(url, JSON.stringify(serie), {headers: this.headers})
            .map(() => true)
    }

    modifySerie(serie: Serie): Observable<any> {
        const url = `${this.apiUrl}/series/${serie.id}`;
        return this.http
            .put(url, JSON.stringify(serie), {headers: this.headers})
            .map(() => true)
    }

    deleteSerie(serie: Serie): Observable<any> {
        const url = `${this.apiUrl}/series/${serie.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .map(() => true)
    }

    createLocation(location: Location): Observable<Location> {
        const url = `${this.apiUrl}/locations`;
        return this.http
            .post(url, JSON.stringify(location), {headers: this.headers})
            .map((res: Response) => res.json())
    }

    modifyLocation(location: Location): Observable<any> {
        const url = `${this.apiUrl}/locations/${location.id}`;
        return this.http
            .put(url, JSON.stringify(location), {headers: this.headers})
            .map(() => true)
    }

    deleteLocation(location: Location): Observable<any> {
        const url = `${this.apiUrl}/locations/${location.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .map(() => true)
    }

    countMovies(query: any): Observable<number> {
        const url = `${this.apiUrl}/movies/count/`;
        let requestOptions = new RequestOptions();
        if (query.title!=undefined) {
            requestOptions.params = query;
        }
        return this.http
            .get(url, requestOptions)
            .map((res: Response) => res.json())
    }

    countSeries(query: any): Observable<number> {
        const url = `${this.apiUrl}/series/count/`;
        let requestOptions = new RequestOptions();
        if (query.title!=undefined) {
            requestOptions.params = query;
        }
        return this.http
            .get(url, requestOptions)
            .map((res: Response) => res.json())
    }

    countElementsInLocation(id: number, index: string): Observable<{movies: number, series: number, index: string}> {
        const url = `${this.apiUrl}/locations/${id}/count`;
        return this.http
            .get(url)
            .map((res: Response) => {
                var movies = res.json().movies;
                var series = res.json().series;
                return {movies: movies, series: series, index: index};
            })
    }

    getCommandsList(): Observable<Command[]> {
        const url = `${this.apiUrl}/commands`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    getCommand(id: number): Observable<Command> {
        const url = `${this.apiUrl}/commands/${id}`;
        return this.http
            .get(url)
            .map((res:Response) => res.json())
    }

    createCommand(command: Command): Observable<any> {
        const url = `${this.apiUrl}/commands`;
        return this.http
            .post(url, JSON.stringify(command), {headers: this.headers})
            .map((res: Response) => res.json())
    }

    modifyCommand(command: Command): Observable<any> {
        const url = `${this.apiUrl}/commands/${command.id}`;
        return this.http
            .put(url, JSON.stringify(command), {headers: this.headers})
            .map(() => true)
    }

    deleteCommand(command: Command): Observable<any> {
        const url = `${this.apiUrl}/commands/${command.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .map(() => true)
    }

    getMovies(query: any): Observable<Movie[]> {
        let requestOptions = new RequestOptions();
        requestOptions.params = query;
        const url = `${this.apiUrl}/movies`;
        return this.http
            .get(url, requestOptions)
            .map((res: Response) => res.json())
    }

    getSeries(query: any): Observable<Serie[]> {
        let requestOptions = new RequestOptions();
        requestOptions.params = query;
        const url = `${this.apiUrl}/series`;
        return this.http
            .get(url, requestOptions)
            .map((res: Response) => res.json())
    }


}
