import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from '../config.service';
import { Flow } from '../model/flow';

@Injectable({
  providedIn: 'root'
})
export class FlowResolverService implements Resolve<Flow>{

  constructor(
    private configService: ConfigService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    if(id)
    return this.configService.findFlowById(id)
  }
}
