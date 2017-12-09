import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Movie } from '../models/movie';
import { Serie } from '../models/serie';
import { Location } from '../models/location';
import { Stats } from '../models/stats';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PorygonSearchService {

    private apiUrl = "http://192.168.0.118:4000/api";
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

    searchMoviesByTitle(title: string): Observable<Movie[]> {
        const url = `${this.apiUrl}/movies?title=${title}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
    }

    searchSeriesByTitle(title: string): Observable<Serie[]> {
        const url = `${this.apiUrl}/series?title=${title}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
    }

    advancedMovieSearch(query: any): Observable<Movie[]> {
        let requestOptions = new RequestOptions();
        requestOptions.params = query;
        const url = `${this.apiUrl}/movies`;
        return this.http
            .get(url, requestOptions)
            .map((res: Response) => res.json())
    }

    advancedSerieSearch(query: any): Observable<Serie[]> {
        let requestOptions = new RequestOptions();
        requestOptions.params = query;
        const url = `${this.apiUrl}/series`;
        return this.http
            .get(url, requestOptions)
            .map((res: Response) => res.json())
    }

}
