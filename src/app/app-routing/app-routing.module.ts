import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainersComponent } from '../containers/containers.component';
import { ImagesComponent } from '../images/images.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'containers',
    component: ContainersComponent
  },
  {
    path: 'images',
    component: ImagesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
