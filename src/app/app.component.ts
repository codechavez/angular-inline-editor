import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }  

    sampleClick(){
        console.log("you clicked me!");
    }
}