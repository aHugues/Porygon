import { Component, OnInit } from '@angular/core';

import { Serie } from '../../models/serie';

import { PorygonService } from '../../services/porygon.service';

@Component({
    selector: 'list-series',
    templateUrl: './list-series.component.html',
    styleUrls: ['../../../styles/lists.css', '../../../styles/card.css']
})
export class ListSeriesComponent implements OnInit {

    seriesList: Serie[] = [];
    seriesListPage: Serie[] = [];
    pageSizeOptions = [10];
    pageSize = this.pageSizeOptions[0];
    currentPageIndex = 0;
    listLength = 0;
    serieSearch = "";

    constructor(private porygonService: PorygonService) {}

    ngOnInit(): void {
        this.porygonService.getSeriesList()
            .subscribe(
                (series: Serie[]) => this.setSeriesList(series),
                error => console.error(error)
            );
    }

    setSeriesList(series: Serie[]) : void {
        this.listLength = series.length;
        this.seriesList = series;
        this.updateDisplayedList();
    }

    updateDisplayedList(): void {
        let firstElement = this.currentPageIndex * this.pageSize;
        let lastElement = firstElement + this.pageSize;
        this.seriesListPage = this.seriesList.slice(firstElement, lastElement);
    }

    onPageChange(event: any): void {
        this.currentPageIndex = event.pageIndex;
        this.updateDisplayedList();
    }

    searchSeries(): void {
        let query = {title: this.serieSearch};
        this.porygonService.getSeries(query)
            .subscribe(
                (series: Serie[]) => {
                    this.setSeriesList(series);
                },
                (error) => console.error(error)
            );
    }

}
