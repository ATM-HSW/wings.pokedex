import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';
import { HttpClient } from '@angular/common/http';
import { FullPokedexComponent } from './full-pokedex/full-pokedex.component';
import { GlobalFunctionsService } from './shared/global-functions.service';
import { RestApiService } from './shared/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  types: any = [];

  constructor(private ngxFavicon: AngularFaviconService, private http: HttpClient, public globalFunctions: GlobalFunctionsService, public restApi: RestApiService) { }
  ngOnInit(): void {
    this.ngxFavicon.setFavicon("favicon.png");
    this.getTypes();
    this.globalFunctions.getRegions();
  }
  title = 'ngfrontend';
  componentReference: any;
  onActivate(pComponentReference: any) {
    this.componentReference = pComponentReference;
  }

  public loginUser(username: String) {
    if (username.length > 0) {
      this.restApi.getUser(username).subscribe((data: any) => {
        var user = data;
        if (user != null) {
          this.globalFunctions.loginUsername = user.userName;
          this.globalFunctions.loginUserId = data.id;
          this.globalFunctions.loginUser = data;
          this.componentReference.getUsersPokemons(user.id)
          localStorage.setItem("stLoginUser", JSON.stringify(this.globalFunctions.loginUser));
        }
      }, (error => {
        console.log(error);
        var create = window.confirm("The user does not exist yet. Should the user be created now?");
        if (create) {
          var user = Object();
          user.userName = username;
          user.firstName = '';
          user.lastName = '';
          user.gender = 'Unknown';
          this.addUser(user);
        }
      }));
    }
  }

  public addUser(user: Object) {
    this.restApi.addUser(user).subscribe((data: any) => {
      this.globalFunctions.loginUsername = data.userName;
      this.globalFunctions.loginUserId = data.id;
      alert("The user has been created. You can now manage your collection.");
    });
  }

  public logoutUser() {
    this.globalFunctions.loginUsername = null;
    //this.componentReference.usersPokemons = [];
    localStorage.removeItem("stLoginUser");
    this.componentReference.clearUsersPokemon();
  }

  changeLanguage(lang: string) {
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
      const url = `https://pokeapi.co/api/v2/type`;
      this.http
        .get(url)
        .toPromise()
        .then((types: any) => {
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