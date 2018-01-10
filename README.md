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
* [x] typeahead
* [ ] html5 inputs
* [ ] validations
* [ ] form
* [ ] special binding
* [ ] editable data table
* [ ] customize css/themes

Date and Time uses **ngx-bootstrap**, please make sure to install it when using date and time controls.
Also, include this style reference into your index.html header
`<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">` 
NOTE: Working in a solution to remove this dependency.

## Getting Started
1. install ***angular-inline-editors*** through [npm](https://www.npmjs.com/search?q=angular-inline-editor) package using the following command:

        `npm install angular-inline-editors --save`

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
All angular-inline-editors have onSave and onCancel events with default behavior that your will read below. Also you can bind onSave and onCancel to trigger your saving data function or your cancel undo data.
```
(onSave)="YOUR_SAVE_FUNCTION" 
(onCancel)="YOUR_CANCEL_FUNCTION"
```
### input-editor API
``` 
label - string - Label value for input element  
id - string - Identifier for input element 
[(ngModel)] - angular two ways binding 
type="text" - Recommend type to use this control.
placeholder - string - Placeholder value for input element
disabled - string - true | false - by defult control is not disabled
stringlength - string - Set maximun string length for input element
(onSave) - Bound to the green button - accepts the changes made in the input element - (optional) triggers your save changes function. 
(onCancel) - Bound to the red button - undo or cancel chnages mde in the input element - (optional) triggers your cancel/undo function.
```
Basic use
``` html
<input-editor label="Full Name" id="txtname" 
[(ngModel)]="fullName" 
type="text"  
placeholder="Enter Full Name">
</input-editor>
```
### textarea-editor
```
label - string - Label value for input element  
id - string - Identifier for input element 
[(ngModel)] - angular two ways binding 
placeholder - string - Placeholder value for input element
disabled - string - true | false - by defult control is not disabled
stringlength - string - Set maximun string length for input element
maxheight - string - Set max height of the textarea - auto | 100% | pixes | rem
(onSave) - Bound to the green button - accepts the changes made in the input element - (optional) triggers your save changes function. 
(onCancel) - Bound to the red button - undo or cancel chnages mde in the input element - (optional) triggers your cancel/undo function.
```
Basic use
``` html
<textarea-editor [(ngModel)]="myBio" 
stringlength="700" 
label="My Bio" 
maxheight="200px">
</textarea-editor>
```
### select-editor
```
label - string - Label value for input element  
id - string - Identifier for input element 
disabled - string - true | false - by defult control is not disabled
placeholder - string - Placeholder value for input element
[(ngModel)] - angular two ways binding for selected item 
[options] - binding to a collection/array of objects
displayValue - string - Set the name of the property to be display;
dataValue - string - Set the name of the property to get the selected value;
(onSave) - Bound to the green button - accepts the changes made in the input element - (optional) triggers your save changes function. 
(onCancel) - Bound to the red button - undo or cancel chnages mde in the input element - (optional) triggers your cancel/undo function.
```
Basic use
``` html
<select-editor label="Country" id="dpCountry" 
[(ngModel)]="selectedCountry" 
[options]="countryOptions" 
displayValue="longName"
dataValue="shortName">
</select-editor>
```
### checkbox-editor
```
label - string - Label value for input element  
id - string - Identifier for input element 
disabled - string - true | false - by defult control is not disabled
[(ngModel)] - angular two ways binding
checkedDisplayValue - string - Text to display when checkbox is checked.
uncheckedDisplayValue - string - Text to display when checkbox is unchecked.
(onSave) - Bound to the green button - accepts the changes made in the input element - (optional) triggers your save changes function. 
(onCancel) - Bound to the red button - undo or cancel chnages mde in the input element - (optional) triggers your cancel/undo function.
```
Basic use
``` html
<checkbox-editor 
checkedDisplayValue="Remember Me!!" 
uncheckedDisplayValue="Don't Remember Me" 
[(ngModel)]="checkboxValue"
label="Remember me?">
</checkbox-editor>
```
