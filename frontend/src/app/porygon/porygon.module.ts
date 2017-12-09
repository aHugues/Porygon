import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';

import { MatPaginatorIntl } from '@angular/material';
import { getFrenchPaginatorIntl } from './components/shared/french-paginator-intl';

import { PorygonComponent } from './components/shared/porygon.component';
import { PorygonHomeComponent } from './components/shared/porygon-home.component';
import { ListMoviesComponent } from './components/movies/list-movies.component';
import { ListSeriesComponent } from './components/series/list-series.component';
import { ListLocationsComponent } from './components/locations/list-locations.component';
import { ListComponent } from './components/shared/list.component';
import { MovieDetailsComponent } from './components/movies/movie-details.component';
import { SerieDetailsComponent } from './components/series/serie-details.component';
import { LocationDetailsComponent } from './components/locations/location-details.component';
import { CommandsComponent } from './components/commands/commands.component';
import { SearchComponent } from './components/shared/search.component';
import { EditCommandComponent } from './components/commands/edit-command.component';

import { PorygonService } from './services/porygon.service';
import { PorygonSearchService } from './services/porygon-search.service';
import { SharingService } from './services/sharing.service';

const appRoutes: Routes = [
    { path: 'porygon', component: PorygonComponent,
        children: [
            {path: '', component: PorygonHomeComponent },
            {path: 'list', component: ListComponent },
            {path: 'list-movie', component: ListMoviesComponent },
            {path: 'list-serie', component: ListSeriesComponent },
            {path: 'list-location', component: ListLocationsComponent },
            {path: 'commands', component: CommandsComponent },
            {path: 'search', component: SearchComponent },
        ]}
];

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTabsModule,
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        CommonModule,
        RouterModule.forRoot(
            appRoutes
        )
    ],
    entryComponents: [
        MovieDetailsComponent,
        SerieDetailsComponent,
        LocationDetailsComponent
    ],
    declarations: [
        PorygonComponent,
        PorygonHomeComponent,
        ListComponent,
        ListMoviesComponent,
        ListSeriesComponent,
        ListLocationsComponent,
        MovieDetailsComponent,
        SerieDetailsComponent,
        LocationDetailsComponent,
        CommandsComponent,
        EditCommandComponent,
        SearchComponent,
    ],
    providers: [
        PorygonService,
        PorygonSearchService,
        SharingService,
        { provide: MatPaginatorIntl, useFactory: getFrenchPaginatorIntl }
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatDialogModule,
        MatTabsModule,
        MatSortModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule
    ]
})
export class PorygonModule {
}
