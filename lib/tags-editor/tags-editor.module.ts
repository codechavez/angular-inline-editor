import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsEditorComponent } from './tags-editor.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    TagsEditorComponent
  ],
  exports: [TagsEditorComponent]
})
export class TagsEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TagsEditorModule,
    }
  }
}