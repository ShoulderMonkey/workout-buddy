import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "*" , pathMatch: "full", redirectTo: "flow"},
  { path: "" , pathMatch: "full", redirectTo: "flow"},
  { path: 'flow', loadChildren: () => import('./flow/flow.module').then(mod => mod.FlowModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
