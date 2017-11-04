import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Command } from '../../models/command';

import { PorygonService } from '../../services/porygon.service';
import { SharingService } from '../../services/sharing.service';

@Component({
    selector: 'edit-command',
    templateUrl: './edit-command.component.html',
    styleUrls: ['../../../styles/card.css', '../../../styles/forms.css']
})
export class EditCommandComponent {

    @Input() selectedCommand: Command;
    @Input() newResource: boolean;

    constructor(
        public porygonService: PorygonService,
    ) {}


    onSubmit(): void {

        // Create or update the command
        if (this.newResource) {
            this.porygonService.createCommand(this.selectedCommand)
                .subscribe(
                    (result: any) => {});
        }
        else {
            this.porygonService.modifyCommand(this.selectedCommand)
                .subscribe(
                    (result: any) => {});
        }
    }


}
