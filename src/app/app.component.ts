import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';


@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

    name: string = 'HOLA WOLRD';
    genderOptions: Gender[]=[ new Gender("F","Female"), new Gender("M","Male")];
    selectedGender: Gender = new Gender("M","Male");
    selected:any;

    constructor() { 
    }

    ngOnInit() { 
    }  

    sampleClick(){
        console.log("you clicked me!");
        console.log(this.selectedGender);
    }
}


export class Gender{

    constructor(short:string, long:string){
        this.shortName = short;
        this.longName = long;
    }
    shortName:string;
    longName:string;
}