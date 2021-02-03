import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';
import { HttpClient } from '@angular/common/http';



//declare const initSbAdmin2: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  categories: any = [];

  constructor(private ngxFavicon: AngularFaviconService, private http: HttpClient) { }
  ngOnInit(): void {
    this.ngxFavicon.setFavicon("favicon.png");
    this.getTypes();
  }
  title = 'ngfrontend';

  changeLanguage(lang: string) {
    console.log("changeLanguage...");
    document.querySelectorAll<HTMLElement>('.language').forEach(element => element.style.display = 'none');
    document.querySelectorAll<HTMLElement>(`.language_${lang}`).forEach(element => element.style.display = 'inline');
    document.getElementById("langChange")?.click();
  }



  filterType(event: any, category: string) {
    console.log("changeLanguage...");
    document.querySelectorAll<HTMLElement>('.category-all').forEach(element => element.style.display = 'none');
    document.querySelectorAll<HTMLElement>(`.category-${category}`).forEach(element => element.style.display = 'block');
    //document.getElementById("langChange")?.click();
  }

  getTypes() {
    const promise = new Promise<void>((resolve, reject) => {
      const url = `https://pokeapi.co/api/v2/type`; ///https://pokeapi.co/api/v2/pokemon-species/${i}`;
      this.http
        .get(url)
        .toPromise()
        .then((types: any) => {
          console.log("types...........................................");
          console.log(types.results);
          for (let n = 0; n < types.results.length; n++) {
            this.categories.push(types.results[n].name);
          }
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    }); 
    return promise;
  }

}


