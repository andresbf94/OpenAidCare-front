import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataObservables {

    constructor() {}

    //VARIABLES
    private sensors = new BehaviorSubject('');
    sharedSensors = this.sensors.asObservable();

    private events = new BehaviorSubject('');
    sharedEvents = this.events.asObservable();
    
    //SETTERS
    setSensors(data : any){
        console.log(data)
        this.sensors.next(data);
    }

    setEvents(data : any){
        console.log(data)
        this.events.next(data);
    }

}