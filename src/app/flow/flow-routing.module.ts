import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowListComponent } from './flow-list/flow-list.component';
import { FlowComponent } from './flow.component';
import { FlowResolverService } from './flow-resolver.service';
import { FlowCreateComponent } from './flow-create/flow-create.component';

const routes: Routes = [
  { path: '', component: FlowListComponent },
  { path: 'edit/:id', component: FlowCreateComponent, resolve: {flow: FlowResolverService}},
  { path: ':id', component: FlowComponent, resolve: { flow: FlowResolverService }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRoutingModule { }
