import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from './location';

import { PorygonService } from './porygon.service';

@Component({
    selector: 'add-movie',
    templateUrl: './add-location.component.html',
    styleUrls: ['./forms.css'],
})
export class AddLocationComponent {

    newLocation = new Location();
    submitted = false;

    constructor(
        private porygonService: PorygonService,
        private router: Router,
    ) {}

    onSubmit(): void {
        this.porygonService.createLocation(this.newLocation)
            .subscribe(
                (result: Location) => this.handleSubmission(),
                error => console.error()
            );
    }

    handleSubmission(): void {
        this.submitted = true;
        this.router.navigate(['porygon/list']);
    }

}
