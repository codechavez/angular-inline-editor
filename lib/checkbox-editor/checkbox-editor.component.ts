import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CHECKBOX_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxEditorComponent),
    multi: true
};

@Component({
    selector: 'checkbox-editor',
    template: '<div *ngIf="editing">' +
        '<div class="row">' +
        '<div class="col-md-6">' +
        '<div class="form-check">' +
        '<label #checkboxEditorControl class="form-check-label">' +
        '<input type="checkbox" class="form-check-input" [(checked)]="value" (change)="checkedChange($event)" />&nbsp;{{label}}' +
        '</label>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6 text-right">' +
        '<button class="btn btn-sm btn-success" type="button" (click)="onSaveCheckBox()">' +
        '<i class="fa fa-check" aria-hidden="true"></i>' +
        '</button>' +
        '<button class="btn btn-sm btn-danger" type="button" (click)="onCancelCheckBox()">' +
        '<i class="fa fa-times" aria-hidden="true"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div *ngIf="!editing">' +
        '<div class="form-group">' +
        '<div (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == \'true\' ? \'inline-no-edit\' : \'inline-edit\'">{{value == true ? checkedDisplayValue : uncheckedDisplayValue}}&nbsp;</div>' +
        '</div>' +
        '</div>',
    styles: [
        '.col-form-label { padding-bottom: 0px !important; }',
        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
    ],
    providers: [CHECKBOX_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class CheckBoxEditorComponent implements ControlValueAccessor, OnInit {

    @ViewChild('checkboxEditorControl') checkboxEditorControl: ElementRef;
    @Input() label: string = ''; // Placeholder value for input element
    @Input() required: boolean = false; // Is input requried?
    @Input() disabled: string = 'false'; // Is input disabled?
    @Input() id: string = ''
    @Input() checkedDisplayValue: string = '';
    @Input() uncheckedDisplayValue: string = '';
    @Output() onSave: EventEmitter<string> = new EventEmitter();
    @Output() onCancel: EventEmitter<string> = new EventEmitter();
    @Output() onEditing: EventEmitter<string> = new EventEmitter();

    public display: string = '';
    public preValue: string = ''; // The value before clicking to edit
    public editing: boolean = false; // Is Component in edit mode?
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event
    private _originalValue: any;
    private _value: true; // Private variable for input value

    constructor(element: ElementRef, private _renderer: Renderer) { }

    onSaveCheckBox() {
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }

    onCancelCheckBox() {
        this.editing = false;
        this._value = this._originalValue;
        this.onCancel.emit('clicked cancel');
    }


    onCloseInput() {
        this.editing = false;
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
        if (this.disabled === 'true') return;

        this.onEditing.emit('editing click');

        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    }

    checkedChange(event: any) {
        this.value = event.target.checked;
    }

    ngOnInit() {

    }
}

