import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){
    sessionStorage.setItem('domain', 'https://projectswebapi.herokuapp.com');
    sessionStorage.setItem('logo', "Projectscape");
  }
  ngOnInit(){
  }
  
}
