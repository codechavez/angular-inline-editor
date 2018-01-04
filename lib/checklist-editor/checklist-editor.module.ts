import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckListEditorComponent } from './checklist-editor.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CheckListEditorComponent
  ],
  exports: [CheckListEditorComponent]
})
export class CheckListEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckListEditorModule,
    }
  }
}