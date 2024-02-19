import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CircularSliderComponent } from './circular-slider/circular-slider.component';
import { MinSecFormatterDirective } from './directives/min-sec-formatter.directive';
import { DynamicFontSizeDirective } from './directives/dynamic-font-size.directive';
import { TimeInputComponent } from './time-input/time-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './timer/timer.component';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatIconModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CircularSliderComponent,
    MinSecFormatterDirective,
    DynamicFontSizeDirective,
    TimeInputComponent,
    TimerComponent
  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ConfirmationDialogComponent,
    CircularSliderComponent,
    MinSecFormatterDirective,
    DynamicFontSizeDirective,
    TimeInputComponent,
    TimerComponent
  ]
})
export class SharedModule { }
