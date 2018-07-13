import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { JsonSchemaFormModule } from '../../lib/src/json-schema-form.module';
// To include JsonSchemaFormModule after downloading from NPM, use this instead:
// import { JsonSchemaFormModule } from 'angular2-json-schema-form';

import { AceEditorDirective } from './ace-editor.directive';
import { DemoComponent } from './demo.component';
import { DemoRootComponent } from './demo-root.component';

import { routes } from './demo.routes';
import { VacDatepickerComponent } from "../../lib/src/framework-library/vac-datepicker/vac-datepicker.component";


@NgModule({
  declarations: [
    AceEditorDirective, DemoComponent, DemoRootComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FlexLayoutModule,
    FormsModule,ReactiveFormsModule, HttpModule, MaterialModule,
    RouterModule.forRoot(routes), JsonSchemaFormModule
  ],
  providers: [ ],
  bootstrap: [ DemoRootComponent ],
  entryComponents: [
      VacDatepickerComponent,
  ]
})
export class DemoModule { }
