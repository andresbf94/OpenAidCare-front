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
    
    private logs = new BehaviorSubject('');
    sharedLogs = this.logs.asObservable();

    private graphs = new BehaviorSubject('');
    sharedGraphs = this.graphs.asObservable();

    private token = new BehaviorSubject('');
    sharedToken = this.token.asObservable();

    private sensorsData = new BehaviorSubject('');
    sharedSensorsData = this.sensorsData.asObservable();

    //SETTERS
    setSensors(data : any){
        console.log(data)
        this.sensors.next(data);
    }

    setEvents(data : any){
        console.log(data)
        this.events.next(data);
    }

    setLogs(data : any){
        console.log(data)
        this.logs.next(data);
    }

    setGraphs(data : any){
        this.graphs.next(data);
    }

    setToken(token : any){
        this.token.next(token);
    }

    setSensorsData(sensorsData : any){
        this.sensorsData.next(sensorsData);
    }

}