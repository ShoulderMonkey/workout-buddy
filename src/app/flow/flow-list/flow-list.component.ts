import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config.service';
import { Flow } from 'src/app/model/flow';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent {

  flows: Flow[] = []

  constructor(
    private configService: ConfigService,
    private dialog: MatDialog,
    private router: Router
  ){
    this.configService.getAllFlows().then(flows => {
      this.flows = flows
    })
  }

  deleteOne(flow: Flow){
    this.dialog.open(ConfirmationDialogComponent, {
      data: `Sei sicuro di voler cancellare questo flow? --> ${flow.description}`
    }).afterClosed().subscribe(async res => {
      if(res){
        this.configService.deleteFlowById(flow.id)
        this.flows = await this.configService.getAllFlows()
      }
    })
  }

  navigateToNew(){
    this.router.navigate(['flow/edit/new'])
  }

  navigateToEdit(flow: Flow){
    this.router.navigate([`flow/edit/${flow.id}`])
  }

  openFlow(flow: Flow){
    this.router.navigate([`flow/${flow.id}`])
  }
}
