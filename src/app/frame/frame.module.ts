import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { FrameComponent } from './frame.component';

const MATERIAL_MODULES = [
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    FrameComponent
  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule,
    TranslateModule,
    AppRoutingModule
  ],
  exports: [
    FrameComponent
  ]
})
export class FrameModule { }
