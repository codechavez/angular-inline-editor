import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Console } from '@angular/core/src/console';

const CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckListEditorComponent),
  multi: true
};

@Component({
  selector: 'checklist-editor',
  template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="">
      <div class="form-check">
          <label #checklistEditorControl *ngFor="let item of options" class="form-check-label">
              <input type="checkbox" class="form-check-input" [value]="item[dataValue]" [class.is-invalid]="checklistReqflag" [name]="item[displayValue]" (change)="updateSelectedChecks($event) "
                  [checked]="(value && (-1 !== value.indexOf(item[dataValue])) ? 'checked' : '')" />&nbsp;{{item[displayValue]}}&nbsp;&nbsp;
          </label>
      </div>
  </div>
  <div *ngIf="checklistReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div class="text-right">
      <button class="btn btn-sm btn-success" type="button" (click)="onSaveChecklist()">
          <i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button class="btn btn-sm btn-danger" type="button" (click)="onCancelChecklist()">
          <i class="fa fa-times" aria-hidden="true"></i>
      </button>
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsChecklistEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsChecklistEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="form-inline">
          <div *ngFor="let c of value">
              <span [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{GetDisplayText(c)}}</span>&nbsp;&nbsp;
          </div>
      </div>
  </div>
</div>`,
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
  ],
  providers: [CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class CheckListEditorComponent implements ControlValueAccessor, OnInit {

  @ViewChild('checklistEditorControl') checklistEditorControl: ElementRef; // input DOM element
  @Input() label: string = '';  // Label value for input element
  @Input() placeholder: string = ''; // Placeholder value ofr input element
  @Input() type: string = 'text'; // The type of input element
  @Input() required: string = 'false';
  @Input() requiredMessage: string = '';
  @Input() disabled: string = 'false'; // Is input disabled?
  @Input() id: string = ''
  @Input() options: any[] = [];
  @Input() displayValue: string = '';
  @Input() dataValue: string = '';
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onEditing: EventEmitter<string> = new EventEmitter();

  public editing: boolean = false; // Is Component in edit mode?
  public preValue: string = ''; // The value before clicking to edit
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  public checklistReqflag: boolean = false;
  private _originalValue: any;
  private _value: any[] = []; // Private variable for input value

  constructor(element: ElementRef, private _renderer: Renderer) { }

  onSaveChecklist() {
    if (this.required == "true") {
      if (this.value == null || this.value.length <= 0 || this.value == undefined) {
        this.checklistReqflag = true;
        return;
      }
      else {
        this.checklistReqflag = false;
      }
    }
    else {
      this.checklistReqflag = false;
    }

    this.onSave.emit('clicked save');
    this.editing = false;
  }

  onCancelChecklist() {
    this.editing = false;
    this._value = this._originalValue;
    this.checklistReqflag = false;
    this.onCancel.emit('clicked cancel');
  }

  onCloseChecklist() {
    this.editing = false;
    this.checklistReqflag = false;
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

  updateSelectedChecks(event: any) {
    if (this._value === null || this._value === undefined) this._value = [];
    if (event.target.checked) {
      if (this._value.indexOf(event.target.value) < 0) {
        this._value.push(event.target.value);
      }
    } else {
      if (this._value.indexOf(event.target.value) > -1) {
        this._value.splice(this.value.indexOf(event.target.value), 1);
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

  IsChecklistEmpty(): Boolean {
    return (this._value == undefined || this._value.length < 0);
  }


  ngOnInit() {

  }
}


