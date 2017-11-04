import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Command } from '../../models/command';

import { PorygonService } from '../../services/porygon.service';
import { SharingService } from '../../services/sharing.service';

@Component({
    selector: 'edit-command',
    templateUrl: './edit-command.component.html',
    styleUrls: ['../../../styles/card.css']
})
export class EditCommandComponent {

    @Input() selectedCommand: Command;
    @Input() newResource: boolean;



}
