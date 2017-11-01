import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PorygonComponent } from './porygon.component';
import { PorygonHomeComponent } from './porygon-home.component';
import { ListMoviesComponent } from './list-movies.component';
import { ListSeriesComponent } from './list-series.component';
import { ListComponent } from './list.component';
import { AddMovieComponent } from './add-movie.component';
import { AddSerieComponent } from './add-serie.component';
import { AddLocationComponent } from './add-location.component';
import { MovieDetailsComponent } from './movie-details.component';
import { SerieDetailsComponent } from './serie-details.component';
import { LocationDetailsComponent } from './location-details.component';
import { CommandsComponent } from './commands.component';
import { SearchComponent } from './search.component'

import { PorygonService } from './porygon.service';
import { PorygonSearchService } from './porygon-search.service';
import { SharingService } from './sharing.service';

const appRoutes: Routes = [
    { path: 'porygon', component: PorygonComponent,
        children: [
            {path: '', component: PorygonHomeComponent },
            {path: 'list', component: ListComponent },
            {path: 'list/movies', component: ListMoviesComponent },
            {path: 'list/series', component: ListSeriesComponent },
            {path: 'add/movie', component: AddMovieComponent },
            {path: 'add/serie', component: AddSerieComponent },
            {path: 'add/location', component: AddLocationComponent },
            {path: 'details/movie/:id', component: MovieDetailsComponent },
            {path: 'details/serie/:id', component: SerieDetailsComponent },
            {path: 'details/location/:id', component: LocationDetailsComponent },
            {path: 'commands', component: CommandsComponent },
            {path: 'search', component: SearchComponent },
        ]}
];

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        CommonModule,
        RouterModule.forRoot(
            appRoutes
        )
    ],
    declarations: [
        PorygonComponent,
        PorygonHomeComponent,
        ListComponent,
        ListMoviesComponent,
        ListSeriesComponent,
        AddMovieComponent,
        AddSerieComponent,
        AddLocationComponent,
        MovieDetailsComponent,
        SerieDetailsComponent,
        LocationDetailsComponent,
        CommandsComponent,
        SearchComponent,
    ],
    providers: [
        PorygonService,
        PorygonSearchService,
        SharingService,
    ],
    exports: [
        RouterModule
    ]
})
export class PorygonModule {}
