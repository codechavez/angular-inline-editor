import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputEditorModule } from "../../lib/input-editor/input-editor.module";
import { SelectEditorModule } from "../../lib/select-editor/select-editor.module";
import { TextAreaEditorModule } from "../../lib/textarea-editor/textarea-editor.module";
import { CheckListEditorModule } from "../../lib/checklist-editor/checklist-editor.module";
import { RadioListEditorModule } from "../../lib/radiolist-editor/radiolist-editor.module";
import { CheckBoxEditorModule } from "../../lib/checkbox-editor/checkbox-editor.module";
import { TagsEditorModule } from "../../lib/tags-editor/tags-editor.module";
import { DateEditorModule } from "../../lib/date-editor/date-editor.module";
import { TimeEditorModule } from "../../lib/time-editor/time-editor.module";
import { TypeAheadEditorModule } from "../../lib/typeahead-editor/typeahead-editor.module";
import { NumberEditorModule } from "../../lib/inputnumber-editor/number-editor.module";
import { DateTimeEditorModule } from "../../lib/datetimepicker-editor/datetimepicker-editor.module";

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