import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextAreaEditorComponent } from './textarea-editor.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    TextAreaEditorComponent
  ],
  exports: [TextAreaEditorComponent]
})
export class TextAreaEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TextAreaEditorModule,
    }
  }
}