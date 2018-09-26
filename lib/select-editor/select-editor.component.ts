import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SELECT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectEditorComponent),
  multi: true
};

@Component({
  selector: 'select-editor',
  template: `<div *ngIf="editing" (clickOutside)="emptyMethod()">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input type="text" #selectEditorControl class="form-control"  [class.is-invalid]="selectReqflag" (click)="showSelectOptions()" readonly [value]="value | displayName:displayValue">
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveSelect()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelSelect()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div *ngIf="selectReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div class="select-menu" *ngIf="open">
      <a class="select-item" *ngFor="let item of options" (click)="onSelection(item)">{{item[displayValue]}}</a>
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsSelectEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">{{placeholder}}&nbsp;  </div>
      <div *ngIf="!IsSelectEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{GetDisplayText(value)}}&nbsp;</div>
  </div>
</div>`,
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
    '.select-menu { top: 100%; position: absolute; z-index: 9000; float: left; min-width: 10rem; padding: .5rem 0; margin: .125rem 0 0; font-size: 1rem; color: #212529; text-align: left; list-style: none; background-color: #fff; background-clip: padding-box; border: 1px solid rgba(0,0,0,.15); border-radius: .25rem; overflow-y: auto; max-height: 360px; }',
    '.select-item { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: transparent; border: 0;}',
    '.select-item:hover { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: #cce4ff; border: 0;}',
    '.form-control[readonly] { background-color: #FFF !important; opacity: 1; cursor:pointer; }'
  ],
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectEditorComponent implements ControlValueAccessor, OnInit {
  @ViewChild('selectEditorControl') selectEditorControl: ElementRef;
  @Input() label: string = '';  // Label value for input element
  @Input() required: string = 'false'; // Is input requried?
  @Input() requiredMessage: string = '';
  @Input() disabled: string = 'false'; // Is input disabled?
  @Input() id: string = '';
  @Input() options: any[] = [];
  @Input() displayValue: string = '';
  @Input() dataValue: string = '';
  @Input() placeholder:string='';
  @Input() scrollAfter:number=0;
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() clickoutside = new EventEmitter<MouseEvent>();
  @Output() onEditing: EventEmitter<string> = new EventEmitter();

  public editing: boolean = false; // Is Component in edit mode?
  public preValue: string = ''; // The value before clicking to edit
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  public selectReqflag: boolean = false;
  private _value: any = ''; // Private variable for input value
  private _originalValue: any;
  private open: boolean = false;
  
  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  @HostListener('document:click',['$event','$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
      if (!targetElement) {
          return;
      }
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
          this.clickoutside.emit(event);
          this.open = false;
      }
  }    

  emptyMethod(){

  }

  onSaveSelect() {
    if(this.required == "true"){
      if(this.selectEditorControl.nativeElement.value == null || this.selectEditorControl.nativeElement.value === undefined || this.selectEditorControl.nativeElement.value === "")   {
        this.selectReqflag = true;        
        return;
      }
      else{
        this.selectReqflag = false;
      }      
    }
    else{
      this.selectReqflag = false;
    }

    if(this._originalValue != this._value){
      this.onSave.emit('clicked save');
    }  
    this.editing=false;
  }
  onCancelSelect() {
    this.editing=false;
    this._value=this._originalValue;
    this.selectReqflag = false;
    this.onCancel.emit('clicked cancel');
  }

  onCloseSelect(){
    this.editing=false;
    this.selectReqflag = false;
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

    this.onEditing.emit('editing click');

    this.preValue = value;
    this.editing = true;
    this._originalValue=value;
  }

  isSelected(opt: any): boolean {
    return opt[this.dataValue] === this.value[this.dataValue]
  }

  ngOnInit() {

  }

  GetDisplayText(c: any): string {
    return c[this.displayValue];

    // for (var i = 0; i < this.options.length; i++) {
    //   if (this.options[i][this.dataValue] == c) {
    //     return this.options[i][this.displayValue];
    //   }
    // }
  }

  IsSelectEmpty(): Boolean{
    return (this._value === undefined || this._value == '');
  }

  showSelectOptions(){
    this.open = !this.open;
  }

  onSelection(item:any){
    this.showSelectOptions();
    this.value = item;
  }
}