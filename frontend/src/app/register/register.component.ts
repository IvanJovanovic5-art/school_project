import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'app/modules/user';
import { RegisterUserService } from '../services/register-user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private usrService:RegisterUserService){}
  user:User = new User ();
  ngOnInit(): void {
  }

  onSubmit(){
    //this.submitted = true;
    this.usrService.addUser(this.user).subscribe(data=>{
      console.log("Registered user", data);
      this.user.email = "";
      this.user.username = "";
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.password = "";
      this.user.phoneNumber = null;
   });
  }
}

