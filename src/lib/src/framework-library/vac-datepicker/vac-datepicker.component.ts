import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AbstractControl,FormsModule,ReactiveFormsModule } from '@angular/forms';

import { JsonSchemaFormService } from '../../json-schema-form.service';
import { dateToString, hasOwn, stringToDate } from '../../shared';
import {IMyDpOptions,MyDatePickerModule} from 'mydatepicker';

export interface IVacMyDpOptions extends IMyDpOptions{
    messages? : object;
}

@Component({
    selector: 'vac-datepicker-widget',
    template: `      
    <div style="padding-bottom: 1.25em;">
        <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
          [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
        <label class="vac-date-field-label" [ngStyle]="{'visibility':anythingWritten && anythingWritten.length > 0 ? 'visible' : 'hidden'}">
            {{options?.title}}
        </label>
        <my-date-picker [name]="controlName" [options]="vacDatePickerOptions"
                        [(ngModel)]="model"
                        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                        [attr.readonly]="options?.readonly ? 'readonly' : null"
                        (componentDisabled)="controlDisabled || options?.readonly"
                        [id]="'control' + layoutNode?._id"
                        [placeholder]="options?.title"
                        [required]="options?.required"
                        [style.width]="'100%'"
                        [className]="options.showErrors === true && options?.errorMessage ? 'error-date':''"
                        (inputFocusBlur)="options.showErrors = true"
                        (inputFieldChanged)="updateValue($event)"
                        ></my-date-picker>
        <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
          [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
        <md-hint ngClass="mat-hint" *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
              align="end" [innerHTML]="options?.description"></md-hint>
        <div class="mat-error ng-star-inserted" *ngIf="options?.showErrors && options?.errorMessage"
        [innerHTML]="options?.errorMessage"></div>
  </div>`,
    styles: [`
    .mat-error { font-size: 75%; margin-bottom: 0.5rem; }
    ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix { width: initial; }
    ::ng-deep .error-date .mydp { border: 1px solid red;}
    ::ng-deep .error-date .mydp .selection { background: #F1DEDE; border-radius: 0px;}
    ::ng-deep .mydp { border-radius: 0px;}
    ::ng-deep .mydp .selection { border-radius: 0px;}
    ::ng-deep .mydp { border:none !important; border-radius: 0px !important; border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;}
    ::ng-deep .mydp .headertodaybtn{border:none !important; border-radius: 0px !important; border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;}
    .mat-hint {font-size: 75%;}
    .vac-date-field-label { color: rgba(0, 0, 0, 0.54); font-size:0.8em;}
  `],
})
export class VacDatepickerComponent implements OnInit, OnChanges {
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    dateValue: any;
    controlDisabled = false;
    boundControl = false;
    options: any;
    anythingWritten: string;
    autoCompleteList: string[] = [];

    public vacDatePickerOptions: IVacMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        disableUntil: {
            year:1850,
            month: 0,
            day: 0
        },
        messages: {
            "required": "Field is required",
            "format": "Field must be in format {format}"
        }
    };
    public model: any;

    @Input() layoutNode: any;
    @Input() layoutIndex: number[];
    @Input() dataIndex: number[];

    constructor(
        private jsf: JsonSchemaFormService
    ) { }

    ngOnInit() {
        //console.log(this.jsf);
        this.anythingWritten = "";

        var controlDate = stringToDate(this.controlValue);

        if(controlDate){
            this.model = { date: { year: controlDate.getFullYear(), month: controlDate.getMonth()+1, day: controlDate.getDate() } };
        }
        else{
            this.model = { date: { year: "", month: "", day: ""}}
        }

        if(this.jsf && this.jsf.globalOptions && this.jsf.globalOptions.datePickerOptions && typeof this.jsf.globalOptions.datePickerOptions == 'object'){
            this.vacDatePickerOptions = this.jsf.globalOptions.datePickerOptions;
        }

        this.options = this.layoutNode.options || {};
        this.options.dateFormat = this.vacDatePickerOptions.dateFormat.toUpperCase();
        this.jsf.initializeControl(this);
        this.setControlDate(this.controlValue);

        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }

    ngOnChanges() {
        this.setControlDate(this.controlValue);
    }

    setControlDate(dateString: string) {
        this.dateValue = stringToDate(dateString);

        this.model.date = this.dateToModelDate(this.dateValue);

        this.jsf.updateValue(this, dateString);
    }

    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, dateToString(event.value, this.options));
        this.anythingWritten = event.value;

        if(!event.valid && event.value != ""){

            if (this.options.validationMessage && this.options.validationMessage != ""){
                this.options.errorMessage = this.options.validationMessage;
            }
            else if (!this.options.validationMessage || this.options.validationMessage == ""){
                this.options.errorMessage = this.vacDatePickerOptions.messages["format"].replace("{format}",this.options.dateFormat);
            }
        }
        else if(!event.valid && event.value == "" && this.options.required){
            this.options.errorMessage = this.vacDatePickerOptions.messages["required"];
        }
        else{
            this.options.errorMessage = "";
        }
    }

    dateToModelDate(date){
        if(date){
            return { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate() }
        }
        return null;
    }
}
