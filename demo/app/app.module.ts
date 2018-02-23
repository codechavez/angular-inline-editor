import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { 
  TypeAheadEditorModule,
  NumberEditorModule,
  DateTimeEditorModule,
  TimeEditorModule,
  DateEditorModule,
  TagsEditorModule,
  CheckBoxEditorModule,
  RadioListEditorModule,
  CheckListEditorModule,
  TextAreaEditorModule,
  SelectEditorModule,
  InputEditorModule
 } from "../../lib/index";

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    InputEditorModule.forRoot(),
    SelectEditorModule.forRoot(),
    TextAreaEditorModule.forRoot(),
    CheckListEditorModule.forRoot(),
    RadioListEditorModule.forRoot(),
    CheckBoxEditorModule.forRoot(),
    TagsEditorModule.forRoot(),
    DateEditorModule.forRoot(),
    TimeEditorModule.forRoot(),
    TypeAheadEditorModule.forRoot(),
    NumberEditorModule.forRoot(),
    DateTimeEditorModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }