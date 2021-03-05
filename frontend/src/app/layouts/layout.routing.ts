import { Routes } from '@angular/router';


import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { CreateAdComponent } from '../create-ad/create-ad.component';
import { ChangeAdComponent } from '../change-ad/change-ad.component';



export const LayoutRoutes: Routes = [
    { path: 'register',  component: RegisterComponent },
    { path: 'login',     component: LoginComponent },
    { path: 'home',      component: HomeComponent },
    { path: 'user',      component: UserComponent },
    { path: 'createAd',  component: CreateAdComponent },
    { path: 'changeAd',  component: ChangeAdComponent },
    { path: '',          redirectTo: 'home'}
];
