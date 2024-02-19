import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LANGS } from '../app.module';
import { ConfigService } from '../config.service';
import { ConfigFile } from '../model/config';

@Component({
  selector: 'recycle-bud-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

  langs = LANGS
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      public translate: TranslateService,
    ){}

    changeLang(lang: string){
      this.translate.use(lang)
    }
}
