import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Project } from '../shared/project';
import { ProjectsService } from '../shared/projects.service';
import { Identity } from '../shared/identity';
import { InfoEditorComponent } from '../info-editor/info-editor.component';


@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css'],
})
export class InfosComponent implements OnInit {
  
  @ViewChild(InfoEditorComponent) child: InfoEditorComponent;

  logo = sessionStorage.getItem("logo");
  projectId: number;
  userId: any;
  projects: Project[];
  filteredProjects: Project[];
  projectsToBeDisplayed: number = 20;
  currentProject: Project = null;
  modifyProject: boolean = false;
  domain = sessionStorage.getItem('domain');
  identity: Identity;
  startWaitingAnimation = false;

  constructor(private route: ActivatedRoute,
    private projectService: ProjectsService,
    identity: Identity,
    public router: Router) {
      this.identity = identity;    
     }


  ngOnInit(): void {

    this.wait();
    this.route.queryParams.subscribe(
      params => {
        this.projectService.loadProjectInfo(params.userId, params.projectId).subscribe(  // TODO: invalid user id or project id
          success => {
            if (success) {
              this.currentProject = this.projectService.currentProject; // Load current project information
              // Load the other projects
              this.projectService.loadProjects(params.userId).subscribe(success => {
                if (success) {
                  this.projects = this.projectService.projects;
                  this.filteredProjects = this.projects.slice(0,this.projectsToBeDisplayed);
                  this.projectId = params.projectId;
                  this.userId = params.userId;
                  this.stopwait();
                }
              })
            }
          });
      });
  }


  wait(){
    this.startWaitingAnimation = true;
  }
  stopwait(){
    this.startWaitingAnimation = false;
  }

  modify() { // open the edit mode
    this.modifyProject = true;
  }
  
  filterProjects(value){ // filter the projects displayed on the right side
    if(!value){
        this.filteredProjects = this.projects.slice(0,this.projectsToBeDisplayed);
    } // when nothing has typed
    this.filteredProjects = this.projects.filter(
       item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    ).slice(0,this.projectsToBeDisplayed);
    
 }

 showMoreLessProjects(choice: string){ // change the number of projects displayed
   let step = 10;
   if(this.projectsToBeDisplayed < this.projects.length && choice == "m"){
     this.projectsToBeDisplayed += step;
     let value = (<HTMLInputElement>document.getElementById("filter")).value;
     this.filterProjects(value);
   }
   else if(choice == "l"){
     if(this.projectsToBeDisplayed-step < 0){
        this.projectsToBeDisplayed = 0;
     }
     else{
       this.projectsToBeDisplayed -= step;
     }
     let value = (<HTMLInputElement>document.getElementById("filter")).value;
     this.filterProjects(value);
   }
 }

}
