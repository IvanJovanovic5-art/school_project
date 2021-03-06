import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'app/modules/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  user: User;
  constructor() { }

  ngOnInit(): void {
    this.resetForm();

  }

  resetForm(Form?:NgForm){

    if(Form != null)

    Form.reset();
    this.user ={
      username:'',
      password:'',
      email:'',
      id: null
    }
  }
}
