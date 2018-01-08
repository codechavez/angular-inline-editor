import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputEditorComponent } from './input-editor.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    InputEditorComponent
  ],
  exports: [InputEditorComponent]
})
export class InputEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputEditorModule,
    }
  }
}