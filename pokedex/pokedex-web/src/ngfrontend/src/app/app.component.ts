import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';
import { HttpClient } from '@angular/common/http';
import { FullPokedexComponent } from './full-pokedex/full-pokedex.component';
import { GlobalFunctionsService } from './shared/global-functions.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  types: any = [];

  constructor(private ngxFavicon: AngularFaviconService, private http: HttpClient, public globalFunctions: GlobalFunctionsService) { }
  ngOnInit(): void {
    //this.globalFunctions.updateCounter(false, -1); 
    this.ngxFavicon.setFavicon("favicon.png");
    this.getTypes();
    this.globalFunctions.getRegions();
    //console.log("buildRegions");
  }
  title = 'ngfrontend';
  componentReference: any;
  onActivate(pComponentReference: any) {
    console.log(pComponentReference)
    this.componentReference = pComponentReference;
  }

  public loginUser(username: String) {
    this.globalFunctions.loginUsername = username;
    this.componentReference.getUsersPokemons();
  }

  public logoutUser() {
    this.globalFunctions.loginUsername = null;
    this.componentReference.clearUsersPokemon(); 
  }

  changeLanguage(lang: string) {
    console.log("changeLanguage...");
    document.querySelectorAll<HTMLElement>('.language').forEach(element => element.style.display = 'none');
    document.querySelectorAll<HTMLElement>(`.language_${lang}`).forEach(element => element.style.display = 'inline');
    document.getElementById("langChange")?.click();
    this.componentReference.test123();
  }

  fullPokedex() {
    document.querySelectorAll<HTMLElement>("#accordionSidebar a.filter.selected").forEach(element => element.classList.remove("selected"));
    document.querySelectorAll<HTMLElement>('.filter-all').forEach(element => element.classList.remove("hidden")); //.display = 'block');
    document.getElementById("a-filter")!.classList.add("collapsed");
    document.getElementById("collapseTwo")!.classList.remove("show");
    document.getElementById("pokemonCounter")!.innerHTML = `${document.querySelectorAll<HTMLElement>('.filter-all').length}`;
    var element = document.getElementById("searchNrName");
    const y = element!.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior: 'smooth' })
    element!.focus();
  }

  getTypes() {
    const promise = new Promise<void>((resolve, reject) => {
      const url = `https://pokeapi.co/api/v2/type`; ///https://pokeapi.co/api/v2/pokemon-species/${i}`;
      this.http
        .get(url)
        .toPromise()
        .then((types: any) => {
          //console.log("types...........................................");
          //console.log(types.results);
          for (let n = 0; n < types.results.length; n++) {
            var filterClass = Object();
            filterClass.name = types.results[n].name;
            filterClass.class = `filter-type-${types.results[n].name}`;
            this.types.push(filterClass);
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



  capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


}


