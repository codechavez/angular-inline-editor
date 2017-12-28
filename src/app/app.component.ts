import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';


@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

    name: string = 'HOLA WOLRD';
    genderOptions: Gender[]=[ new Gender("F","Female"), new Gender("M","Male"), new Gender("T", "Trans"), new Gender("G","Gay")];
    selectedGender: Gender = new Gender("M","Male");
    textArea:string="We print a wide selection of eye-catching materials, including copies, documents, presentations, brochures, flyers, postcards and business cards. You can also count on us for all your banner and graphic printing, as well as signs, posters and engineering prints."
    selectedGenders: string[]=[ "M","F"];

    constructor() { 
    }

    ngOnInit() { 
    }  

    sampleClick(){
        console.log("you clicked me!");
        for(var i=0; i < this.selectedGenders.length; i++){
            console.log(this.selectedGenders[i]);
        }
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