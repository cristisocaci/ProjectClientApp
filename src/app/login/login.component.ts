import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $AB from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  message: string;
  domain = sessionStorage.getItem('domain');
  startWaitingAnimation = false;

  @Input()
  redirect: string;

  constructor(private http : HttpClient,
              public router: Router,) { }

  ngOnInit(): void {
  }
  wait(){
    this.startWaitingAnimation = true;
  }
  stopwait(){
    this.startWaitingAnimation = false;
  }

  login(form: NgForm) {
    this.wait();
    const credentials = JSON.stringify(form.value);
    this.http.post(this.domain+"/api/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      const userId = (<any>response).userId;
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.stopwait();
      if(this.redirect == "true"){
        this.router.navigate(['/projects'], {queryParams:{userId:userId}})
      }
      (<any>$("#login")).modal('hide');
    }, err => {
      this.invalidLogin = true;
      if(err.status == 404){
        this.message = "Incorrect username";
      }
      else if(err.status == 401){
        this.message = "Incorrect password";
      }
      this.stopwait();
    });
  }

  dismiss(){
    this.invalidLogin = false;
  }

}
