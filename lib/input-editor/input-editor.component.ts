import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputEditorComponent),
  multi: true
};

@Component({
  selector: 'input-editor',
  template: '<div *ngIf="editing">'+
  '<label class="col-form-label">{{label}}</label>'+
  '<div class="input-group">'+
      '<input #inputEditorControl class="form-control" [required]="required" [id]="id" [(ngModel)]="value" [type]="type" [placeholder]="placeholder"'+
          '[maxlength]="stringlength">'+
      '<span class="input-group-btn">'+
          '<button class="btn btn-sm btn-success" type="button" (click)="onSaveComplete()">'+
              '<i class="fa fa-check" aria-hidden="true"></i>'+
          '</button>'+
          '<button class="btn btn-sm btn-danger" type="button" (click)="onCancelComplete()">'+
              '<i class="fa fa-times" aria-hidden="true"></i>'+
          '</button>'+
      '</span>'+
  '</div>'+
'</div>'+
'<div *ngIf="!editing">'+
  '<div class="form-group">'+
      '<label class="col-form-label">{{label}}</label>'+
      '<div *ngIf="IsEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">'+
          '{{placeholder}}&nbsp;'+
      '</div>'+
      '<div *ngIf="!IsEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == \'true\' ? \'inline-no-edit\' : \'inline-edit\'">{{value}}&nbsp;</div>'+
  '</div>'+
'</div>' ,
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
  ],
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class InputEditorComponent implements ControlValueAccessor, OnInit {

  @ViewChild('inputEditorControl') inputEditorControl: ElementRef; // input DOM element
  @Input() label: string = '';  // Label value for input element
  @Input() placeholder: string = ''; // Placeholder value ofr input element
  @Input() type: string = 'text'; // The type of input element
  @Input() required: boolean = false; // Is input requried?
  @Input() disabled: string = 'false'; // Is input disabled?
  @Input() id: string = ''
  @Input() stringlength: string = ''
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
    if (this.disabled === "true") {
      return;
    }

    this.preValue = value;
    this.editing = true;
    // Focus on the input element just as the editing begins
    setTimeout(() => this._renderer.invokeElementMethod(this.inputEditorControl,
      'focus', []));
  }

  IsEmpty(): Boolean{
    return (this._value === undefined || this._value == '');
  }

  ngOnInit() {

  }
}