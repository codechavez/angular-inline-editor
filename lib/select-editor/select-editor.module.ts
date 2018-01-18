import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectEditorComponent } from './select-editor.component';
import { DisplayNameFilter } from "../pipes/displayvalue.pipe";
// import { OutSideClickDirective } from "../directives/outsideclick.directive";

@NgModule({
  imports: [
    CommonModule, 
    FormsModule
    
  ],
  declarations: [
    SelectEditorComponent,
    DisplayNameFilter
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