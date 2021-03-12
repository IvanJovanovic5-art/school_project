import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { LayoutRoutes } from './layout.routing';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { CreateAdComponent } from '../create-ad/create-ad.component';
import { ChangeAdComponent } from '../change-ad/change-ad.component';
import { AddCompanyComponent } from '../add-company/add-company.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    LbdModule,
    ReactiveFormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    CreateAdComponent,
    ChangeAdComponent,
    AddCompanyComponent
  ]
})

export class LayoutModule {}
