# angular-inline-editor | Straigth Forward Native UI Controls
angular-inline-editor is a small Angular library that allows the experience to use editable elements (click-to-edit) with out the pain and/or hassle. 

Follow me @ http://codechavez.com

## angular-inline-editor  
[![Build Status](https://travis-ci.org/codechavez/angular-inline-editor.svg?branch=master)](https://travis-ci.org/codechavez/angular-inline-editor)  [![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/angular-inline-editors)
### Dependencies
angular-inline-editor was built to work with Angular 4+, current dependencies are Bootstrap (3.3.7+) and FontAwesome. 
### Road Map - Inline Editors
* [x] input - text
* [x] textarea
* [x] select
* [ ] checkbox
* [x] checkbox list
* [ ] radio
* [x] radio list
* [ ] date
* [ ] time
* [ ] datetime
* [ ] html5 inputs
* [ ] editable data table
* [ ] customize css/themes

## Getting Started
1. install ***angular-inline-editor*** through [npm](https://www.npmjs.com/search?q=angular-inline-editor) package using the following command:

        `npm install @codechavez/angular-inline-editor --save`

2. Include Bootstrap (3.3.7+) and FontAwesome in your project. 

### Adding angular-inline-editor to your Module
Following the principle of Angular is based on Modules and you use what you want when you want to use it. You can add each angular-inline-editor separate. This means you add Modules based on what you need.

## How to use
#### Add the module
``` typescript
import {InputEditorModule} from 'angular-inline-editor';

@NgModule({
  imports: [
    InputEditorModule.forRoot()
  ]
})
```

#### Add more
``` typescript
import {InputEditorModule} from 'angular-inline-editor';
import { SelectEditorModule } from 'angular-inline-editor';

@NgModule({
  imports: [
    InputEditorModule.forRoot(),
    SelectEditorModule.forRoot()
    
  ]
})
```
#### On your html
``` html
<input-editor label="First Name" id="txtname" [(ngModel)]="name" type="text" placeholder="Enter First Name" (onSave)="sampleClick()"></input-editor>
```
#### On your component
``` typescript
name:string;

sampleClick(){
  console.log(name);
}
```

## angular-inline-editor API



