# angular-inline-editors | Simple and easy to use.
angular-inline-editors is a small Angular library that allows the experience to use editable elements (click-to-edit) without the pain and/or hassle. 

* Follow me @ http://codechavez.com 
* DEMO @ http://angularinlineeditorsdemo.azurewebsites.net
* source code demo @ https://github.com/codechavez/angular-inline-editor-demo

## angular-inline-editors  
[![npm version](https://badge.fury.io/js/angular-inline-editors.svg)](https://badge.fury.io/js/angular-inline-editors)
[![Build Status](https://travis-ci.org/codechavez/angular-inline-editor.svg?branch=master)](https://travis-ci.org/codechavez/angular-inline-editor) 
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/angular-inline-editors)
### Dependencies
angular-inline-editors was built to work with Angular 4+, current dependencies are Bootstrap (3.3.7+) and FontAwesome. 
### Road Map - Inline Editors
* [x] input - text
* [x] textarea
* [x] select
* [x] checkbox
* [x] checkbox list
* [x] radio list
* [x] tags
* [x] date
* [x] time
* [ ] html5 inputs
* [ ] validations
* [ ] form
* [ ] special binding
* [ ] editable data table
* [ ] customize css/themes

## Getting Started
1. install ***angular-inline-editors*** through [npm](https://www.npmjs.com/search?q=angular-inline-editor) package using the following command:

        `npm install @codechavez/angular-inline-editors --save`

2. Dependencies to be included in your project:
* Bootstrap (3.3.7+) - Styling. We Recommend **Bootstrap 4** 
* **FontAwesome** - Icons.
* **ngx-bootstrap** for date, time, and datetime editors.

### Adding angular-inline-editors to your Module
Following the principle of Angular is based on Modules and you use what you want when you want to use it. You can add each angular-inline-editors separate. This means you add Modules based on what you need.

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
  console.log('clicked!!');
}
```

## angular-inline-editors API



