import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../alert.service';

import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  createAdForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
}

ngOnInit() {
    this.createAdForm = this.formBuilder.group({
        date: ['', Validators.required],
        time: ['', Validators.required],
        company: ['', Validators.required]
    });
}

// convenience getter for easy access to form fields
get f() { return this.createAdForm.controls; }

onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createAdForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.createAdForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
