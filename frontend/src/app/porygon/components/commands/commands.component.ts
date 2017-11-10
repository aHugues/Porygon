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
        this.editing = true;
    }

    onCloseCard(): void {
        this.editing = false;
        this.newResource = false;
    }

    onSelectCommand(command: Command): void {
        let tempCommand = new Command(command);
        this.selectedCommand = tempCommand;
        this.editing = true;
        this.newResource = false;
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
        command: this.selectedCommand
    })}

}
