import { Injectable } from '@angular/core';

@Injectable()
export class SharingService {


    private getDefaultData(option: string): any {
        // gets the default data associated to this option;

        let defaultData = {};

        let numberPerPage = 10;

        let moviePage = 1;
        let seriePage = 1;

        // associated to ascending title
        let movieSortNumber = 1;
        let serieSortNumber = 1;

        let movieQuery: any = {
            title: undefined,
            sort: "title",
            limit: numberPerPage,
            offset: 0,
        };

        let serieQuery: any = {
            title: undefined,
            sort: "title",
            limit: numberPerPage,
            offset: 0,
        };

        let tab = "movies";


        defaultData["numberPerPage"] = numberPerPage;

        defaultData["moviePage"] = moviePage;
        defaultData["seriePage"] = seriePage;

        defaultData["movieSortNumber"] = movieSortNumber;
        defaultData["serieSortNumber"] = serieSortNumber;

        defaultData["movieQuery"] = movieQuery;
        defaultData["serieQuery"] = serieQuery;

        defaultData["tab"] = tab;

        return defaultData[option];
    }

    public setData(option: string, value: any): void {
        // console.log("setting " + option + " to " + JSON.stringify(value));
        localStorage.setItem(option, JSON.stringify(value));
    }

    public getData(option: string): any {
        // console.log("-------------------")
        // console.log("getting data for " + option);
        let data = localStorage.getItem(option);
        // console.log("getting " + data);

        // checks if not set value and set to the default
        if (!data) {
            // console.log("no data received for " + option);
            let defaultData = this.getDefaultData(option);
            this.setData(option, defaultData);
            return defaultData;
        }

        // console.log('\n');
        return JSON.parse(data);
    }

    public getAllData(): any  {
        return localStorage;
    }
}
