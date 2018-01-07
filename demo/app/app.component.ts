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
    selectedCountry: Country = new Country("US","United States");
    disselectedCountry: Country = new Country("IT","Italy");
    emptyselectedCountry:string;
    // TextArea
    textArea:string="We print a wide selection of eye-catching materials, including copies, documents, presentations, brochures, flyers, postcards and business cards. You can also count on us for all your banner and graphic printing, as well as signs, posters and engineering prints."
    distextArea:string="We print a wide selection of eye-catching materials, including copies, documents, presentations, brochures, flyers, postcards and business cards. You can also count on us for all your banner and graphic printing, as well as signs, posters and engineering prints."
    emptyTextArea:string;
    // checklist
    langOptions: Language[] = [new Language("en","English"), new Language("sp","Spanish"), new Language("it","Italian")];
    selectedLang: string[]=['en','sp'];
    disselectedLang: string[]=['en','it'];
    // radiolist
    genderOptions: Gender[]=[ new Gender("F","Female"), new Gender("M","Male"), new Gender("T", "Transexual")];
    selectedGender: string='M';
    emptySelectedGender:string;

    checkboxValue:boolean = false;
    checkedboxValue:boolean = true;
    emptycheckedboxValue:boolean = false;

    tags:string[]=["angular","typescript","VSCode","C#"];
    distags:string[]=["angular","angular-cli","vscode"];
    emptytags:string[];

    constructor() { }

    ngOnInit() { }  

    sampleClick(){
        console.log("you clicked me!");
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
