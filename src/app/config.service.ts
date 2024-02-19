import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, ReadFileResult } from '@capacitor/filesystem';
import { ConfigFile } from './model/config';
import { TranslateService } from '@ngx-translate/core';
import { Flow } from './model/flow';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config!: ConfigFile

  constructor(private translate: TranslateService) {
    this.loadConfig()
  }

  private async loadConfig(){
      const contents = await Filesystem.readFile({
        path: 'secrets/config.json',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      }).catch((error) => {
        console.log(error);
        this.saveConfig(new ConfigFile())
      });
      console.log('secrets:', contents);
      const data = (contents as ReadFileResult).data
      this.config = JSON.parse(`${data}`)
      this.translate.use(this.config.lang)
  };

  private async saveConfig(content: ConfigFile){
    await Filesystem.writeFile({
      path: 'secrets/config.json',
      data: JSON.stringify(content),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };



  getAllFlows(){
    return this.config.flows.sort((a,b) => a.createdAt - b.createdAt)
  }

  findFlowById(id: string){
    return this.config.flows.find(flow => flow.id === id)
  }

  updateFlow(flow: Flow){
    const index = this.config.flows.findIndex(f => f.id === flow.id)
    this.config.flows[index] = flow
    this.saveConfig(this.config)
  }

  addFlow(flow: Flow){
    this.config.flows.push(flow)
    this.saveConfig(this.config)
  }

  deleteFlowById(id: string){
    this.config.flows = this.config.flows.filter(flow => flow.id !== id)
    this.saveConfig(this.config)
  }
}

