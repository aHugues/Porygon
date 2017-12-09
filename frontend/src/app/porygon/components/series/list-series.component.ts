import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Serie } from '../../models/serie';

import { PorygonService } from '../../services/porygon.service';
import { SerieDetailsComponent } from './serie-details.component';

@Component({
    selector: 'list-series',
    templateUrl: './list-series.component.html',
    styleUrls: ['../../styles/lists.css', '../../styles/card.css']
})
export class ListSeriesComponent implements OnInit {

    seriesList: Serie[] = [];
    seriesListPage: Serie[] = [];
    pageSizeOptions = [10];
    pageSize = this.pageSizeOptions[0];
    currentPageIndex = 0;
    listLength = 0;
    query = {
        title: "",
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
    }

    sortingParameter = 1;

    constructor(
        private porygonService: PorygonService,
        public dialog: MatDialog
    ) {}

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
        this.porygonService.getSeries(this.query)
            .subscribe(
                (series: Serie[]) => {
                    this.setSeriesList(series);
                },
                (error) => console.error(error)
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

    onSortSeries(id: number) {
        let newSortValue = this.calculateNewSortValue(this.sortingParameter, id);
        this.sortingParameter = newSortValue;
        this.query.sort = this.sortDictionnary[newSortValue];
        this.searchSeries();
    }

    onNewSerie(): void {
        this.openEditingDialog(-1, true);
    }

    onEditSerie(id: number) {
        this.openEditingDialog(id, false);
    }

    openEditingDialog(id: number, newResource: Boolean) {
        let editingDialog = this.dialog.open(SerieDetailsComponent, {
            width: '40%',
            data: { id: id, newResource: newResource }
        });

        editingDialog.afterClosed().subscribe((result: any) => {
            this.ngOnInit();
        });
    }

}
