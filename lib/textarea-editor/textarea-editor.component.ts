import { Component, OnInit, Input, ElementRef, ViewChild, Renderer, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TEXTAREA_EDIT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaEditorComponent),
    multi: true
};

@Component({
    selector: 'textarea-editor',
    template: `<div *ngIf="editing">
    <label class="col-form-label">{{label}}</label>
    <div class="input-group">
        <textarea [id]="id" #textareaEditorControl [(ngModel)]="value" [class.is-invalid]="textareaReqflag" style="word-wrap: break-word;"
            [maxlength]="stringlength" [style.height]="maxheight" class="form-control" wrap="hard">
            </textarea>
    </div>
    <div *ngIf="textareaReqflag" class="text-danger">
        {{requiredMessage}}
    </div>
    <div class="text-right">
        <button class="btn btn-success" type="button" (click)="onSaveTextarea()">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="btn btn-danger" type="button" (click)="onCancelTextarea()">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>

</div>
<div *ngIf="!editing">
    <div class="form-group">
        <label class="col-form-label">{{label}}</label>
        <div *ngIf="IsTextareaEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">{{placeholder}}&nbsp;</div>
        <div *ngIf="!IsTextareaEmpty()" (click)="edit(value)" (focus)="edit(value);" [style.height]="minheight" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value}}&nbsp;</div>
    </div>
</div>`,
    styles: [
        '.col-form-label { padding-bottom: 0px !important; }',
        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
    ],
    providers: [TEXTAREA_EDIT_VALUE_ACCESSOR]
})
export class TextAreaEditorComponent implements ControlValueAccessor, OnInit {

    @ViewChild('textareaEditorControl') textareaEditorControl: ElementRef;
    @Input() label: string = '';
    @Input() required: string = "false";
    @Input() requiredMessage: string = '';
    @Input() disabled: string = "false";
    @Input() id: string = '';
    @Input() stringlength: string = '';
    @Input() maxheight: string = 'auto';
    @Input() minheight: string = 'auto';
    @Input() placeholder: string = '';
    @Output() onSave: EventEmitter<string> = new EventEmitter();
    @Output() onCancel: EventEmitter<string> = new EventEmitter();
    @Output() onEditing: EventEmitter<string> = new EventEmitter();

    public editing: boolean = false; // Is Component in edit mode?
    public preValue: string = ''; // The value before clicking to edit
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event
    public textareaReqflag: boolean = false;
    private _originalValue: any;
    private _value: string = ''; // Private variable for input value

    constructor(element: ElementRef, private _renderer: Renderer) { }

    onSaveTextarea() {
        if (this.required == "true") {
            if (this.textareaEditorControl.nativeElement.value == null || this.textareaEditorControl.nativeElement.value === undefined || this.textareaEditorControl.nativeElement.value === "") {
                this.textareaReqflag = true;
                return;
            }
            else {
                this.textareaReqflag = false;
            }
        }
        else {
            this.textareaReqflag = false;
        }

        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }

    onCancelTextarea() {
        this.editing = false;
        this._value = this._originalValue;
        this.textareaReqflag = false;
        this.onCancel.emit('clicked cancel');
    }

    onCloseTextarea() {
        this.editing = false;
        this.textareaReqflag = false;
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
        if (this.disabled === "true") {
            return;
        }

        this.onEditing.emit('editing click');

        this.preValue = value;
        this.editing = true;
        this._originalValue = value;

        setTimeout(() => { this.textareaEditorControl.nativeElement.focus(); }, 300);
    }

    IsTextareaEmpty(): Boolean {
        return (this._value === undefined || this._value == '');
    }

    ngOnInit() {

    }
}