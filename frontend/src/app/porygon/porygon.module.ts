import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { PorygonComponent } from './components/shared/porygon.component';
import { PorygonHomeComponent } from './components/shared/porygon-home.component';
import { ListMoviesComponent } from './components/movies/list-movies.component';
import { ListSeriesComponent } from './components/series/list-series.component';
import { ListComponent } from './components/shared/list.component';
import { AddMovieComponent } from './components/movies/add-movie.component';
import { AddSerieComponent } from './components/series/add-serie.component';
import { AddLocationComponent } from './components/locations/add-location.component';
import { MovieDetailsComponent } from './components/movies/movie-details.component';
import { SerieDetailsComponent } from './components/series/serie-details.component';
import { LocationDetailsComponent } from './components/locations/location-details.component';
import { CommandsComponent } from './components/commands/commands.component';
import { SearchComponent } from './components/shared/search.component'

import { PorygonService } from './services/porygon.service';
import { PorygonSearchService } from './services/porygon-search.service';
import { SharingService } from './services/sharing.service';

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
        MatToolbarModule,
        MatButtonModule,
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
        MatToolbarModule,
        MatButtonModule,
        RouterModule
    ]
})
export class PorygonModule {}
