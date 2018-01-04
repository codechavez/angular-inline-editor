import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectEditorComponent } from './select-editor.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    SelectEditorComponent
  ],
  exports: [SelectEditorComponent]
})
export class SelectEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectEditorModule,
    }
  }
}