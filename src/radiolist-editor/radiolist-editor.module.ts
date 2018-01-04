import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioListEditorComponent } from './radiolist-editor.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    RadioListEditorComponent
  ],
  exports: [RadioListEditorComponent]
})
export class RadioListEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RadioListEditorModule,
    }
  }
}