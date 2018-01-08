import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimeEditorComponent } from './time-editor.component';
import { TimepickerModule  } from "ngx-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TimepickerModule .forRoot()
    ],
    declarations: [
        TimeEditorComponent
    ],
    exports: [TimeEditorComponent]
})
export class TimeEditorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TimeEditorModule,
        }
    }
}