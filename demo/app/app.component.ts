import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    // Input 
    name: string = 'John';
    middle: string = 'D.';
    last:string;
    // Select
    countryOptions: Country[]=[new Country("US","United States"), new Country("FR","France"), new Country("IT","Italy")];
    selectedCountry: string="US";
    emptyselectedCountry:string;
    // TextArea
    textArea:string="We print a wide selection of eye-catching materials, including copies, documents, presentations, brochures, flyers, postcards and business cards. You can also count on us for all your banner and graphic printing, as well as signs, posters and engineering prints."
    emptyTextArea:string;
    // checklist
    langOptions: Language[] = [new Language("en","English"), new Language("sp","Spanish"), new Language("it","Italian")];
    selectedLang: string[]=['en','sp'];

    genderOptions: Gender[]=[ new Gender("F","Female"), new Gender("M","Male"), new Gender("T", "Trans"), new Gender("G","Gay")];
    selectedGender: Gender = new Gender("M","Male");
    
    selectedGenders: string[]=[ "M","F"];
    radioSelectedGenders: string[]=["M"];
    emptySelectedGenders:string[]=[];

    constructor() { }

    ngOnInit() { }  

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

export class Language{
    constructor(short:string, long:string){
        this.shortName = short;
        this.longName = long;
    }
    shortName:string;
    longName:string;
}

export class Country{
    constructor(short:string, long:string){
        this.shortName = short;
        this.longName = long;
    }
    shortName:string;
    longName:string;
}
