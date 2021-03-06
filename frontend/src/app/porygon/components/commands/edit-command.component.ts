import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { Command } from '../../models/command';

@Component({
    selector: 'edit-command',
    templateUrl: './edit-command.component.html',
    styleUrls: ['../../styles/card.css', '../../styles/forms.css']
})
export class EditCommandComponent implements OnInit{

    @Input() selectedCommand: Command;
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSave: EventEmitter<Command> = new EventEmitter<Command>();
    @Output() onDeleteEvent: EventEmitter<Command> = new EventEmitter<Command>();

    currentCommand: Command;

    constructor() {}

    ngOnInit(): void {
        this.currentCommand = new Command(this.selectedCommand);
    }


    onSubmit(): void {
        // send a signal to the parent element to save the new command
        this.onSave.emit(this.currentCommand);
    }

    onCloseCard(): void {
        // send a signal to the parent element to close the card
        this.onClose.emit();
    }

    onDelete(): void {
        this.onDeleteEvent.emit(this.currentCommand);
    }

    ngOnChanges(changes: any): void {
        this.ngOnInit();
    }


}
