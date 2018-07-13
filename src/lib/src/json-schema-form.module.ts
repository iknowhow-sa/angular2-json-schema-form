import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryModule } from './widget-library/widget-library.module';
import { WidgetLibraryService } from './widget-library/widget-library.service';

import { JsonSchemaFormComponent } from './json-schema-form.component';

import { JsonSchemaFormService } from './json-schema-form.service';

import { NoFrameworkComponent } from './framework-library/no-framework/no-framework.component';
import { Framework } from './framework-library/framework';
import { NoFramework } from './framework-library/no-framework/no.framework';
import { NoFrameworkModule } from './framework-library/no-framework/no-framework.module';

import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerModule } from 'mydatepicker';
import { VacDatepickerComponent } from "./framework-library/vac-datepicker/vac-datepicker.component";
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    WidgetLibraryModule, NoFrameworkModule,BrowserModule, MatFormFieldModule, MyDatePickerModule
  ],
  declarations: [ JsonSchemaFormComponent , VacDatepickerComponent],
  exports: [ JsonSchemaFormComponent, WidgetLibraryModule ],
  entryComponents: [
      VacDatepickerComponent
  ]
})
export class JsonSchemaFormModule {
  static forRoot(...frameworks): ModuleWithProviders {
    const loadFrameworks = frameworks.length ?
      frameworks.map(framework => framework.forRoot().providers[0]) :
      [{ provide: Framework, useClass: NoFramework, multi: true }];
    return {
      ngModule: JsonSchemaFormModule,
      providers: [
        JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService,
        ...loadFrameworks
      ]
    };
  }
}
