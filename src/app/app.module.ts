import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputEditorModule } from "../app/components/input-editor/input-editor.module";
import { SelectEditorModule } from "../app/components/select-editor/select-editor.module";
import { TextAreaEditorModule } from "../app/components/textarea-editor/textarea-editor.module";
import { CheckListEditorModule } from "../app/components/checklist-editor/checklist-editor.module";
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    InputEditorModule.forRoot(),
    SelectEditorModule.forRoot(),
    TextAreaEditorModule.forRoot(),
    CheckListEditorModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }