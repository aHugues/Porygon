import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';
import { Serie } from '../models/serie';
import { Location } from '../models/location';
import { Stats } from '../models/stats';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class PorygonSearchService {

    private apiUrl = environment.apiUrl;
    private headers: Headers;

    constructor(private http: HttpClient) {
        this.headers = new Headers({'Content-Type': 'application/json'});
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `$(error.status) - ${error.statusTest}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    searchMoviesByTitle(title: string): any {
        const url = `${this.apiUrl}/movies?title=${title}`;
        return this.http.get(url);
    }

    searchSeriesByTitle(title: string): any {
        const url = `${this.apiUrl}/series?title=${title}`;
        return this.http.get(url)
    }

    advancedMovieSearch(query: any): any {
        let params = query;
        const url = `${this.apiUrl}/movies`;
        return this.http.get(url, { params: params })
    }

    advancedSerieSearch(query: any): any {
        let params = query;
        const url = `${this.apiUrl}/series`;
        return this.http.get(url, {params: params} )
    }

}
