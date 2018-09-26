import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateEditorComponent),
  multi: true
};

@Component({
  selector: 'date-editor',
  template: `<div *ngIf="editing">
    <label class="col-form-label">{{label}}</label>
    <div class="input-group">
        <input #dateEditorControl #dp="bsDatepicker" bsDatepicker  [class.is-invalid]="dateReqflag" class="form-control" [id]="id" [(ngModel)]="value" type="text" [placeholder]="placeholder">
        <span class="input-group-btn">
            <button class="btn btn-sm btn-success" type="button" (click)="onSaveDate()">
                <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button class="btn btn-sm btn-danger" type="button" (click)="onCancelDate()">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        </span>
    </div>
    <div *ngIf="dateReqflag" class="text-danger">
            {{requiredMessage}}
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
</div>
`,
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
    '.bs-datepicker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }'
  ],
  providers: [DATE_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class DateEditorComponent implements ControlValueAccessor, OnInit {

  @ViewChild('dateEditorControl') dateEditorControl: ElementRef; // input DOM element
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

  public preValue: string = ''; // The value before clicking to edit
  public editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  public dateReqflag: boolean = false;
  private _originalValue: any;
  private _value: string = ''; // Private variable for input value

  constructor(element: ElementRef, private _renderer: Renderer) { }

  onSaveDate() {
    if (this.required == "true") {
      if (this.dateEditorControl.nativeElement.value == null || this.dateEditorControl.nativeElement.value === undefined || this.dateEditorControl.nativeElement.value === "") {
        this.dateReqflag = true;
        return;
      }
      else {
        this.dateReqflag = false;
      }
    }
    else {
      this.dateReqflag = false;
    }

    if(this._originalValue != this._value){
      this.onSave.emit('clicked save');
    }  
    this.editing = false;
  }

  onCancelDate() {
    this.editing = false;
    this._value = this._originalValue;
    this.dateReqflag = false;
    this.onCancel.emit('clicked cancel');
  }


  onCloseDate() {
    this.editing = false;
    this.dateReqflag = false;
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
    return (this._value === undefined || this._value == '');
  }

  ngOnInit() {

  }
}