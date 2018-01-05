import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputEditorModule } from "../../lib/input-editor/input-editor.module";
import { SelectEditorModule } from "../../lib/select-editor/select-editor.module";
import { TextAreaEditorModule } from "../../lib/textarea-editor/textarea-editor.module";
import { CheckListEditorModule } from "../../lib/checklist-editor/checklist-editor.module";
import { RadioListEditorModule } from "../../lib/radiolist-editor/radiolist-editor.module";
import { CheckBoxEditorModule } from "../../lib/checkbox-editor/checkbox-editor.module";

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
    CheckBoxEditorModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }