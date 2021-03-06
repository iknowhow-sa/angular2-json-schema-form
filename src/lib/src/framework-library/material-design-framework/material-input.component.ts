import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { hasOwn } from './../../shared/utility.functions';


import { JsonSchemaFormService } from '../../json-schema-form.service';

@Component({
  selector: 'material-input-widget',
  template: `
    <md-form-field *ngIf="isConditionallyShown()"
      [floatPlaceholder]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
      [style.width]="'100%'">
      <input mdInput #inputControl
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (input)="updateValue($event)">
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
    </md-form-field>`,
})
export class MaterialInputComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: string;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;
  autoCompleteList: string[] = [];
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  @Input() data:any;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);

  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }

  isConditionallyShown(): boolean {
    this.data = this.jsf.data;
    let result: boolean = true;
    if (this.data && hasOwn(this.options, 'condition')) {
      const model = this.data;

      /* tslint:disable */
      eval('result = ' + this.options.condition);
      /* tslint:enable */
    }

    return result;
  }
}
