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
    countryOptions: Country[]=[new Country("US","United States"), new Country("FR","France"), new Country("IT","Italy"),  new Country("CN","Canada"),  new Country("GR","Germany"),  new Country("JP","Japan"), new Country("BZ","Brazil"), new Country("CX","China"), new Country("RC","Greece")];
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

    defaultdatesample:Date = new Date('1/8/218');
    disdatesample:Date = new Date();
    emptydatesample:Date;

    timeSample:Date = new Date();
    distimeSample:Date=new Date();
    emptytimeSample:Date;

    
    states:string[]= ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 
        'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    countries:Country[] = [new Country("US","United States"), new Country("FR","France"), new Country("IT","Italy"), new Country("Ger","Germany"), new Country("sp","Spain"), new Country("GK","Greek")];
    selectedTypeahead:Country =  new Country("US","United States");
    disselectedTypeahead:Country= new Country("GK","Greek");
    emptyselectedTypeahead:Country;

    numbers:number=6;
    disnumbers:number=10;
    renumber:number;

    defaultdatetime:Date = new Date();
    disdatetime:Date = new Date();
    reqdatetime:Date;
    
    constructor() { }

    ngOnInit() { }  

    sampleClick(){
        console.log("you clicked me!");
        console.log(this.selectedTypeahead);
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
