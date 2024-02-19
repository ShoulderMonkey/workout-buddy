import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MatIconsSvgService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    console.log('mat-icon-service init');
    
    this.loadSVGIcons();
  }

  loadSVGIcons(){
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/logo.svg")
    );
  }
}
