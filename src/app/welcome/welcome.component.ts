import { Component, OnInit } from '@angular/core';

import { Identity } from '../shared/identity';
import { ProjectsService } from '../shared/projects.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  identity: Identity;
  logo = sessionStorage.getItem("logo");

  constructor( identity: Identity,
              private projectService: ProjectsService, ) { 
    this.identity = identity;
  }

  ngOnInit(): void {
    this.projectService.loadProjects("0").subscribe(success =>{ 
      if (success) {
        console.log('ok')
      }
    })
  }
  
}
