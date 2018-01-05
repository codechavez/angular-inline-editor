import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckBoxEditorComponent } from './checkbox-editor.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CheckBoxEditorComponent
  ],
  exports: [CheckBoxEditorComponent]
})
export class CheckBoxEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckBoxEditorModule,
    }
  }
}