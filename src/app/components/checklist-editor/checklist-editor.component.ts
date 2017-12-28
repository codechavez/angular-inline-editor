import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextAreaEditorModule } from '../textarea-editor/textarea-editor.module';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

const CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckListEditorComponent),
  multi: true
};

@Component({
  selector: 'checklist-editor',
  templateUrl: 'checklist-editor.component.html',
  styles: [
    '.col-form-label { padding-bottom: 0px !important; }',
    '.inline-edit { text-decoration: none; border-bottom: #A8B9CE dashed 1px; cursor: pointer; width: auto;}',
    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: pointer; width: auto;}'
  ],
  providers: [CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class CheckListEditorComponent implements ControlValueAccessor, OnInit {

  @ViewChild('checklistEditorControl') checklistEditorControl: ElementRef; // input DOM element
  @Input() label: string = '';  // Label value for input element
  @Input() placeholder: string = ''; // Placeholder value ofr input element
  @Input() type: string = 'text'; // The type of input element
  @Input() required: boolean = false; // Is input requried?
  @Input() disabled: boolean = false; // Is input disabled?
  @Input() id: string = ''
  @Input() options: any[] = [];
  @Input() displayValue: string = '';
  @Input() dataValue: string = '';
  @Input() stringlength: string = ''
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<string> = new EventEmitter();


  private _value: any[] = []; // Private variable for input value
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
    if (this.disabled == true) {
      return;
    }

    this.preValue = value;
    this.editing = true;
    // Focus on the input element just as the editing begins
    setTimeout(() => this._renderer.invokeElementMethod(this.checklistEditorControl,
      'focus', []));
  }

  updateSelectedChecks(event: any) {
    debugger;
    if (event.target.checked) {
      if (this.value.indexOf(event.target.value) < 0) {
        this.value.push(event.target.value);
      }
    } else {
      if (this.value.indexOf(event.target.name) > -1) {
        this.value.splice(this.value.indexOf(event.target.value), 1);
      }
    }
  }


  GetDisplayText(c:any):string{
    for(var i=0;i<this.options.length;i++){
      if(this.options[i][this.dataValue]==c){
        console.log(this.options[i][this.displayValue]);
        return this.options[i][this.displayValue];
      }
    }

    
    
  }




  ngOnInit() {

  }
}


