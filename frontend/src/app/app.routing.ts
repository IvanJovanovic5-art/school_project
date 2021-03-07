import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
 {
    path: '',
    component: LayoutComponent,
    children: [
      {
    path: '',
    
    loadChildren: './layouts/layout.module#LayoutModule'
}]},

{path: '**',
redirectTo:'home'},

{ path: 'register', component: RegisterComponent }, //user register
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
