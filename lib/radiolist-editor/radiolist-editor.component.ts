import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const RADIOLIST_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioListEditorComponent),
    multi: true
};

@Component({
    selector: 'radiolist-editor',
    template: `<div *ngIf="editing">
    <label class="col-form-label">{{label}}</label>
    <div class="">
        <div class="form-check">
            <label #radiolistEditorControl *ngFor="let item of options" class="form-check-label">
                <input type="radio" class="form-check-input" [class.is-invalid]="radiolistReqflag" [value]="item[dataValue]" [name]="item[displayValue]" (change)="updateSelectedChecks($event)"
                    [checked]="(value && (-1 !== value.indexOf(item[dataValue])) ? 'checked' : '')" />&nbsp;{{item[displayValue]}}&nbsp;&nbsp;
            </label>
        </div>
    </div>
    <div *ngIf="radiolistReqflag" class="text-danger">
        {{requiredMessage}}
    </div>
    <div class="text-right">
        <button class="btn btn-sm btn-success" type="button" (click)="onSaveRadiolist()">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="btn btn-sm btn-danger" type="button" (click)="onCancelRadiolist()">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>
</div>
<div *ngIf="!editing">
    <div class="form-group">
        <label class="col-form-label">{{label}}</label>
        <div *ngIf="IsRadioListEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
            {{placeholder}}&nbsp;
        </div>
        <div *ngIf="!IsRadioListEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{GetDisplayText(value)}}&nbsp;</div>
    </div>
</div>`,
    styles: [
        '.col-form-label { padding-bottom: 0px !important; }',
        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
    ],
    providers: [RADIOLIST_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class RadioListEditorComponent implements ControlValueAccessor, OnInit {

    @ViewChild('radiolistEditorControl') radiolistEditorControl: ElementRef; // input DOM element
    @Input() label: string = '';  // Label value for input element
    @Input() required: string = 'false';
    @Input() requiredMessage: string = '';
    @Input() disabled: string = 'false'; // Is input disabled?
    @Input() id: string = ''
    @Input() options: any[] = [];
    @Input() displayValue: string = '';
    @Input() dataValue: string = '';
    @Input() placeholder: string = '';
    @Output() onSave: EventEmitter<string> = new EventEmitter();
    @Output() onCancel: EventEmitter<string> = new EventEmitter();
    @Output() onEditing: EventEmitter<string> = new EventEmitter();

    public editing: boolean = false; // Is Component in edit mode?
    public preValue: string = ''; // The value before clicking to edit
    public radiolistReqflag: boolean = false;
    public isEmpty: boolean = true;
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event
    private _originalValue: any;
    private _value: any[] = []; // Private variable for input value

    constructor(element: ElementRef, private _renderer: Renderer) { }

    onSaveRadiolist() {
        if (this.required == "true") {
            if (this.value == null || this.value.length <= 0 || this.value == undefined) {
                this.radiolistReqflag = true;
                return;
            }
            else {
                this.radiolistReqflag = false;
            }
        }
        else {
            this.radiolistReqflag = false;
        }

        this.onSave.emit('clicked save');
        this.editing = false;
    }

    onCancelRadiolist() {
        this.editing = false;
        this._value = this._originalValue;
        this.radiolistReqflag = false;
        this.onCancel.emit('clicked cancel');
    }

    onCloseRadiolist() {
        this.editing = false;
        this.radiolistReqflag = false;
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
        if (this.disabled === 'true') {
            return;
        }

        this.onEditing.emit('editing click');

        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    }

    IsRadioListEmpty(): Boolean {
        return (this._value == undefined || this._value.length <= 0);
    }
    updateSelectedChecks(event: any) {
        if (this._value === null || this._value === undefined) this._value = [];
        if (event.target.checked) {
            if (this._value.indexOf(event.target.value) < 0) {
                this._value = [];
                this._value.push(event.target.value);
            }
        } else {
            if (this._value.indexOf(event.target.name) > -1) {
                this._value.splice(this._value.indexOf(event.target.value), 1);
            }
        }
    }

    GetDisplayText(c: any): string {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i][this.dataValue] == c) {
                return this.options[i][this.displayValue];
            }
        }
    }

    ngOnInit() {

    }

}
