import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { FlowListComponent } from './flow-list/flow-list.component';
import { FlowRoutingModule } from './flow-routing.module';
import { FlowComponent } from './flow.component';
import { FlowCreateComponent } from './flow-create/flow-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NgxCircularSliderModule } from 'ngx-circular-slider';
import { DurationSelectorComponent } from './flow-create/duration-selector/duration-selector.component';
import { FlowEndDialogComponent } from './flow-end-dialog/flow-end-dialog.component';


const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  declarations: [
    FlowComponent,
    FlowListComponent,
    FlowCreateComponent,
    DurationSelectorComponent,
    FlowEndDialogComponent
    
  ],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    FlowRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FlowModule { }
