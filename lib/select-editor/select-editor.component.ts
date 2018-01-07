import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SELECT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectEditorComponent),
  multi: true
};

@Component({
  selector: 'select-editor',
  template: '<div *ngIf="editing">'+
  '<label class="col-form-label">{{label}}</label>'+
  '<div class="input-group">'+
      '<select #selectEditorControl class="form-control" [(ngModel)]="value">'+
          '<option *ngFor="let opt of options" [ngValue]="opt">'+  
              '{{opt[displayValue]}}'+
          '</option>'+
      '</select>'+
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
      '<div *ngIf="IsSelectEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">{{placeholder}}&nbsp;  </div>'+
      '<div *ngIf="!IsSelectEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == \'true\' ? \'inline-no-edit\' : \'inline-edit\'">{{GetDisplayText(value)}}&nbsp;</div>'+
  '</div>'+
'</div>',
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
  ],
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectEditorComponent implements ControlValueAccessor, OnInit {
  @ViewChild('selectEditorControl') selectEditorControl: ElementRef;
  @Input() label: string = '';  // Label value for input element
  @Input() required: boolean = false; // Is input requried?
  @Input() disabled: string = 'false'; // Is input disabled?
  @Input() id: string = '';
  @Input() options: any[] = [];
  @Input() displayValue: string = '';
  @Input() dataValue: string = '';
  @Input() placeholder:string='';
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<string> = new EventEmitter();

  private _value: any = ''; // Private variable for input value
  private preValue: string = ''; // The value before clicking to edit
  private editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  onSaveComplete() {
    this.onSave.emit('clicked save');
    this.editing=false;
  }

  onCancelComplete() {
    this.editing=false;
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

  // Start the editting process for the input element
  edit(value: any) {
    if (this.disabled === 'true') {
      return;
    }
    this.preValue = value;
    this.editing = true;
    // Focus on the input element just as the editing begins
    setTimeout(() => this._renderer.invokeElementMethod(this.selectEditorControl,
      'focus', []));
  }

  isSelected(opt: any): boolean {
    return opt[this.dataValue] === this.value[this.dataValue]
  }

  ngOnInit() {

  }

  GetDisplayText(c: any): string {
    for (var i = 0; i < this.options.length; i++) {
      if (this.options[i][this.dataValue] == c) {
        return this.options[i][this.displayValue];
      }
    }
  }

  IsSelectEmpty(): Boolean{
    return (this._value === undefined || this._value == '');
  }

}