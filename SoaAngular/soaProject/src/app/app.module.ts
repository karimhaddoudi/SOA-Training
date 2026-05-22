import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UeAddComponent } from './ue-add/ue-add.component';
import { UeEditComponent } from './ue-edit/ue-edit.component';
import { UeListComponent } from './ue-list/ue-list.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleAddComponent } from './module-add/module-add.component';
import { ModuleEditComponent } from './module-edit/module-edit.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';

@NgModule({
  declarations: [
    AppComponent,
    UeAddComponent,
    UeEditComponent,
    UeListComponent,
    ModuleListComponent,
    ModuleAddComponent,
    ModuleEditComponent,
    ApiDocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
