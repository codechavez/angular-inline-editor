import { Component, OnInit, Input, ElementRef, ViewChild, Renderer, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TEXTAREA_EDIT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaEditorComponent),
    multi: true
};

@Component({
    selector: 'textarea-editor',
    templateUrl: 'textarea-editor.component.html',
    styles: [
        '.col-form-label { padding-bottom: 0px !important; }',
        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: pointer; width: auto;}'
    ],
    providers: [TEXTAREA_EDIT_VALUE_ACCESSOR]
})
export class TextAreaEditorComponent implements ControlValueAccessor, OnInit {

    @ViewChild('textareaEditorControl') textareaEditorControl: ElementRef;
    @Input() label: string = '';
    @Input() required: boolean = false;
    @Input() disabled: string = "false";
    @Input() id: string = '';
    @Input() stringlength: string = '';
    @Input() maxheight: string = 'auto';
    @Input() minheight: string = 'auto';
    @Output() onSave: EventEmitter<string> = new EventEmitter();
    @Output() onCancel: EventEmitter<string> = new EventEmitter();

    private _value: string = ''; // Private variable for input value
    private preValue: string = ''; // The value before clicking to edit
    private editing: boolean = false; // Is Component in edit mode?
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event


    constructor(element: ElementRef, private _renderer: Renderer) { }

    onSaveComplete() {
        this.onSave.emit('clicked save');
    }

    onCancelComplete() {
        this.onCancel.emit('clicked cancel');
    }

    // Control Value Accessors for ngModel
    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        this._value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    // Do stuff when the input element loses focus
    onBlur($event: Event) {
        this.editing = false;
    }

    // Start the editting process for the input element
    edit(value: any) {
        debugger;
        if (this.disabled === "true") {
            return;
        }

        this.preValue = value;
        this.editing = true;
        // Focus on the input element just as the editing begins
        setTimeout(() => this._renderer.invokeElementMethod(this.textareaEditorControl,
            'focus', []));
    }

    ngOnInit() {

    }
}