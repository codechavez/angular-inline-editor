import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberEditorComponent } from './number-editor.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    NumberEditorComponent
  ],
  exports: [NumberEditorComponent]
})
export class NumberEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NumberEditorModule,
    }
  }
}