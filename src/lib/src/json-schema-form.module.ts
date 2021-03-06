import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrameworkLibraryModule } from './framework-library/framework-library.module';
import { WidgetLibraryModule } from './widget-library/widget-library.module';

import { JsonSchemaFormComponent } from './json-schema-form.component';

import { JsonSchemaFormService } from './json-schema-form.service';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryService } from './widget-library/widget-library.service';

import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerModule } from 'mydatepicker';
import { VacDatepickerComponent } from "./framework-library/vac-datepicker/vac-datepicker.component";
import { MdFormFieldModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    FrameworkLibraryModule, WidgetLibraryModule,BrowserModule, MdFormFieldModule, MyDatePickerModule
  ],
  declarations: [ JsonSchemaFormComponent, VacDatepickerComponent ],
  exports: [
    JsonSchemaFormComponent, FrameworkLibraryModule, WidgetLibraryModule
  ],
  providers: [
    JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService
  ],
  entryComponents: [
      VacDatepickerComponent
  ]
})
export class JsonSchemaFormModule { }
