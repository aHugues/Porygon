import { Component, OnInit } from '@angular/core';
import { NgPlural } from '@angular/common';
import { Router } from '@angular/router';

import { Command } from '../../models/command';

import { PorygonService } from '../../services/porygon.service';
import { SharingService } from '../../services/sharing.service';

@Component({
    selector: 'commands',
    templateUrl: './commands.component.html',
    styleUrls: [ '../../../styles/lists.css', '../../../styles/card.css']
})
export class CommandsComponent implements OnInit {

    commandsList: Command[] = new Array();
    selectedCommand = new Command();
    newResource = false;
    editing = false;

    constructor(
        public porygonService: PorygonService,
        public sharingService: SharingService,
    ) {}

    ngOnInit(): void {
        this.updateList();
    }

    onCreateCommand(): void {
        this.selectedCommand = new Command();
        this.newResource = true;
        this.editing = false;

    }

    onCloseCard(): void {
        this.editing = false;
        this.newResource = false;
    }

    onSelectCommand(command: Command): void {
        this.selectedCommand.id = command.id;
        this.selectedCommand.title = command.title;
        this.selectedCommand.remarks = command.remarks;
        this.newResource = false;
        this.editing = true;
    }

    onReset(): void {
        // Reset all fields to void
        this.selectedCommand = new Command();
    }

    canReset(): Boolean {
        return this.selectedCommand.title!=undefined || this.selectedCommand.remarks!=undefined;
    }

    updateList(): void {
        this.porygonService.getCommandsList()
            .subscribe(
                (commands: Command[]) => this.commandsList = commands,
                (error) => console.error(error)
            )
    }

    onServiceCalled(): void {
        this.updateList();
        this.onCloseCard();
        this.onReset();
    }

    onSave(event: any): void {
        // Create or update the command
        if (event.newResource) {
            this.porygonService.createCommand(event.command)
                .subscribe(
                    (result: any) => this.onServiceCalled());
        }
        else {
            this.porygonService.modifyCommand(event.command)
                .subscribe(
                    (result: any) => this.onServiceCalled());
        }
    }

    onDelete(command: any): void {
        this.porygonService.deleteCommand(command)
            .subscribe(
                (result: any) => this.onServiceCalled());
    }

    get diagnostic() { return JSON.stringify({
        editing: this.editing,
        newResource: this.newResource
    })}

}
