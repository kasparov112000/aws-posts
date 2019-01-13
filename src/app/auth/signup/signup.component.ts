import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";

export interface Roles {
  value: string;
  viewValue: string;
}
 

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  selected: any;
  
  private authStatusSub: Subscription;
 
 
  roles: Roles[] = [
    {value: 'visitor-0', viewValue: 'Visitor'},
    {value: 'register-1', viewValue: 'Regular User'},
    {value: 'volunteer-2', viewValue: 'Volunteer'},
    {value: 'teacher-3', viewValue: 'Teacher'},
    {value: 'admin-4', viewValue: 'Admin'}
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    
    this.authService.createUser(form.value.email, form.value.password, this.selected);
    console.log(this.selected);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
