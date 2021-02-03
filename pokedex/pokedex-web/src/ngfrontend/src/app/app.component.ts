import { Component, OnInit } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';
//declare const initSbAdmin2: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private ngxFavicon: AngularFaviconService) { }
  ngOnInit(): void {
    this.ngxFavicon.setFavicon("favicon.png");
  }
  title = 'ngfrontend';

  changeLanguage(lang: string) {
    console.log("changeLanguage...");
    document.querySelectorAll<HTMLElement>('.language').forEach(element => element.style.display = 'none');
    document.querySelectorAll<HTMLElement>(`.language_${lang}`).forEach(element => element.style.display = 'inline');
    document.getElementById("langChange")?.click();
  }  
}

