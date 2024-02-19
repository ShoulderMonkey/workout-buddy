import { v4 as uuidv4 } from 'uuid';

export class Flow {
    createdAt: Date
    id: string;
    description?: string;
    routines: Routine[] = []

    constructor(){
        this.id = uuidv4();
        this.createdAt = new Date()
    }
}

export class Routine {
    description?: string;
    imageSrc?: string;
    durationInMs: number = 10000;

    constructor(){}
}