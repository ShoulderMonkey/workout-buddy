import { Flow } from "./flow";

export class ConfigFile {
    lang: 'en' | 'it';
    flows: any[] = []

    constructor(){
        this.lang = 'it'
        this.flows.push(new Flow())
    }


}