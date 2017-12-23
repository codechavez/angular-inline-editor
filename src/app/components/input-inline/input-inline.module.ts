import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputInlineComponent } from './input-inline.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    InputInlineComponent
  ],
  exports: [InputInlineComponent]
})
export class InputInlineModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputInlineModule,
    }
  }
}