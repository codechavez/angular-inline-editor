import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeAheadEditorComponent } from './typeahead-editor.component';

import { typeaheadfilter } from "../pipes/typeahead-filter.pipe";
import { DisplayFieldNameFilter } from "../pipes/displayvalue.pipe";
import { HighLightPipe } from "../pipes/texthighlight.pipe";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    typeaheadfilter,
    TypeAheadEditorComponent,
    DisplayFieldNameFilter,HighLightPipe
    
  ],
  exports: [TypeAheadEditorComponent]
})
export class TypeAheadEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TypeAheadEditorModule,
    }
  }
}