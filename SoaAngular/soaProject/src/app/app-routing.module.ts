import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UeListComponent } from './ue-list/ue-list.component';
import { UeAddComponent } from './ue-add/ue-add.component';
import { UeEditComponent } from './ue-edit/ue-edit.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleAddComponent } from './module-add/module-add.component';
import { ModuleEditComponent } from './module-edit/module-edit.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';

const routes: Routes = [
  { path: '', redirectTo: 'ue/list', pathMatch: 'full' },
  { path: 'ue/list', component: UeListComponent },
  { path: 'ue/add', component: UeAddComponent },
  { path: 'ue/update/:code', component: UeEditComponent },
  { path: 'module/list', component: ModuleListComponent },
  { path: 'module/add', component: ModuleAddComponent },
  { path: 'module/update/:matricule', component: ModuleEditComponent },
  { path: 'api-docs', component: ApiDocsComponent },
  { path: '**', redirectTo: 'ue/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
