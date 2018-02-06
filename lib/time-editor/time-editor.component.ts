import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TIME_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeEditorComponent),
  multi: true
};

@Component({
  selector: 'time-editor',
  template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div>
      <timepicker #timeEditorControl [class.is-invalid]="timeReqflag" [(ngModel)]="value" [hourStep]=1 [minuteStep]=1></timepicker>
  </div>
  <div *ngIf="timeReqflag" class="text-danger">
          {{requiredMessage}}
      </div>
  <div class="text-right">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveTime()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelTime()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsDateEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsDateEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value | date:format}}&nbsp;</div>
  </div>
</div>`,
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
    '.bs-timepicker-field { width: 50px; }'
  ],
  providers: [TIME_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class TimeEditorComponent implements ControlValueAccessor, OnInit {

  @ViewChild('timeEditorControl') timeEditorControl: ElementRef; // input DOM element
  @Input() label: string = '';  // Label value for input element
  @Input() placeholder: string = ''; // Placeholder value ofr input element
  @Input() type: string = 'text'; // The type of input element
  @Input() required: string = 'false'; // Is input requried?
  @Input() requiredMessage: string = '';
  @Input() disabled: string = 'false'; // Is input disabled?
  @Input() id: string = '';
  @Input() format: string = '';
  @Input() stringlength: string = '';
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onEditing: EventEmitter<string> = new EventEmitter();

  private _originalValue: any;
  private _value: any; // Private variable for input value
  private preValue: string = ''; // The value before clicking to edit
  private editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  private timeReqflag: boolean = false;

  constructor(element: ElementRef, private _renderer: Renderer) { }

  onSaveTime() {

    var inputs = document.getElementsByClassName("form-control text-center bs-timepicker-field");
    var hh = <HTMLInputElement>inputs.item(0);
    var mm = <HTMLInputElement>inputs.item(1);

    if (this.required == "true") {
      if (hh.value == null || hh.value == undefined || hh.value == "" || mm.value == null || mm.value == undefined || mm.value == "") {
        this.timeReqflag = true;
        hh.classList.add('is-invalid');
        mm.classList.add('is-invalid');
        return;
      }
      else {
        this.timeReqflag = false;
        hh.classList.remove('is-invalid');
        mm.classList.remove('is-invalid');
      }
    }
    else {
      this.timeReqflag = false;
    }

    this.onSave.emit('clicked save');
    this.editing = false;
  }

  onCancelTime() {
    this.editing = false;
    this._value = this._originalValue;
    this.timeReqflag = false;
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
    if (this.disabled === "true") {
      return;
    }

    this.onEditing.emit('editing click');

    this.preValue = value;
    this.editing = true;
    this._originalValue = value;
  }

  IsDateEmpty(): Boolean {
    return (this._value === undefined || this._value == null);
  }

  ngOnInit() {

  }
}