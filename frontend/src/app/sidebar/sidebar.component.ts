import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'pe-7s-graph', class: '' },
    { path: 'user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: 'register', title: 'Register',  icon:'pe-7s-note2', class: '' },
    { path: 'login', title: 'Login',  icon:'pe-7s-door-lock', class: '',  },
    { path: 'addCompany', title: 'Add Company',  icon:'pe-7s-portfolio', class: '' },
    { path: 'createAd', title: 'Create Ad',  icon:'pe-7s-plus', class: '' },
    { path: 'changeAd', title: 'Change Ad',  icon:'pe-7s-refresh-2', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
