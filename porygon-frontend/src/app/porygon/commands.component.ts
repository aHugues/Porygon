import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Command } from './command';

import { PorygonService } from './porygon.service';
import { SharingService } from './sharing.service';

@Component({
    selector: 'commands',
    templateUrl: './commands.component.html'
})
export class CommandsComponent implements OnInit {

    commandsList: Command[] = new Array();
    selectedCommand = new Command;
    newRessource = true;

    constructor(
        public porygonService: PorygonService,
        public sharingService: SharingService,
    ) {}

    ngOnInit(): void {
        this.updateList();
    }

    onSelectCommand(command: Command): void {
        this.selectedCommand.id = command.id;
        this.selectedCommand.title = command.title;
        this.selectedCommand.remarks = command.remarks;
        this.newRessource = false;
    }

    onReset(): void {
        // Reset all fields to void
        this.selectedCommand = new Command();
        this.newRessource = true;
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
        this.onReset();
    }

    onSubmit(): void {

        // Create or update the command
        if (this.newRessource) {
            this.porygonService.createCommand(this.selectedCommand)
                .subscribe(
                    (result: any) => this.onServiceCalled());
        }
        else {
            this.porygonService.modifyCommand(this.selectedCommand)
                .subscribe(
                    (result: any) => this.onServiceCalled());
        }
    }

    onDelete(): void {
        this.porygonService.deleteCommand(this.selectedCommand)
            .subscribe(
                (result: any) => this.onServiceCalled());
    }

    get diagnostic() { return JSON.stringify(this.sharingService.getAllData())}

}
