import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NUMBER_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberEditorComponent),
  multi: true
};

@Component({
  selector: 'number-editor',
  template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #numberEditorControl class="form-control" 
          [class.is-invalid]="numberReqflag || numberBigflag"
          [id]="id" 
          [(ngModel)]="value" 
          type="number" 
          [placeholder]="placeholder"
          [max]="maxNumber"
          [min]="minNumber"
          [step]="step">
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveInputNumber()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelInputNumber()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div *ngIf="numberReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div *ngIf="numberBigflag" class="text-danger">
      Number enter is out of bound MAX:{{maxNumber}} MIN:{{minNumber}}
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsInputTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsInputTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value}}&nbsp;</div>
  </div>
</div>`,
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
  ],
  providers: [NUMBER_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class NumberEditorComponent implements ControlValueAccessor, OnInit {

  @ViewChild('numberEditorControl') numberEditorControl: ElementRef;
  @Input() label: string = '';  // Label value for input element
  @Input() placeholder: string = ''; // Placeholder value ofr input element
  @Input() required: string = 'false'; // Is input requried?
  @Input() requiredMessage: string = '';
  @Input() disabled: string = 'false'; // Is input disabled?
  @Input() id: string = '';
  @Input() maxNumber: number;
  @Input() minNumber: number;
  @Input() step: number = 1;
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onEditing: EventEmitter<string> = new EventEmitter();

  public preValue: string = ''; // The value before clicking to edit
  public editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  public numberReqflag: boolean = false;
  public numberBigflag: boolean = false;
  private _originalValue: any;
  private _value: number; // Private variable for input value

  constructor(element: ElementRef, private _renderer: Renderer) { }

  onSaveInputNumber() {
    const enteredValue = this.numberEditorControl.nativeElement.value;
    
    this.numberReqflag = this.required === "true" && !enteredValue;
    this.numberBigflag = enteredValue && (Number(enteredValue) > this.maxNumber || Number(enteredValue) < this.minNumber);

    if (this.numberBigflag || this.numberReqflag) return;

    this.onSave.emit('clicked save');
    this.editing = false;
  }

  onCancelInputNumber() {
    this.editing = false;
    this._value = this._originalValue;
    this.numberReqflag = false;
    this.onCancel.emit('clicked cancel');
  }

  onCloseInputNumber(){
    this.editing=false;
    this.numberReqflag = false;
  }

  // Control Value Accessors for ngModel
  get value(): number {
    return this._value;
  }

  set value(v: number) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // Required for ControlValueAccessor interface
  writeValue(value: number) {
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

    setTimeout(() => { this.numberEditorControl.nativeElement.focus(); }, 300);
  }

  IsInputTextEmpty(): Boolean {
    return (this._value === undefined || this._value == null);
  }


  ngOnInit() {

  }
}