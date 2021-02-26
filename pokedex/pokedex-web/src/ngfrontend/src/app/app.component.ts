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

/**  
* AppComponent is rendering the main layout of the application. 
* The login is also done here.
* 
* @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   .  
*/
export class AppComponent implements OnInit {

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

  /**  
    * With this function the user is logged in.
    * After login, the user is stored in the local web storage, so that the user remains logged in when the page is reloaded.
    * If the user does not exist yet, the option to create the user is offered. 
    * 
    * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
    * @param {String} username - Username of the user to be logged in.
    */
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

  /**  
  * This function creates a new user in the backend. The REST Api is called for this purpose.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  * @param {Object} user - New user to be created.
  */
  public addUser(user: Object) {
    this.restApi.addUser(user).subscribe((data: any) => {
      this.globalFunctions.loginUsername = data.userName;
      this.globalFunctions.loginUserId = data.id;
      alert("The user has been created. You can now manage your collection.");
    });
  }

  /**  
  * This function logs out the use from the App.
  * The user is also removed from the local web storage.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  public logoutUser() {
    this.globalFunctions.loginUsername = null;
    localStorage.removeItem("stLoginUser");
    this.componentReference.clearUsersPokemon();
  }

  /**  
  * This function changes the language in which the names of the Pokemons are displayed.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  * @param {string} lang - The abbreviation for the language. From this the CSS class for showing and hiding the name is generated..
  */
  changeLanguage(lang: string) {
    document.querySelectorAll<HTMLElement>('.language').forEach(element => element.style.display = 'none');
    document.querySelectorAll<HTMLElement>(`.language_${lang}`).forEach(element => element.style.display = 'inline');
    document.getElementById("langChange")?.click();
    this.componentReference.test123();
  }

  // Global variable in which a list of the Pokemons types are held. The HTML for the type filter is generated from this list. 
  types: any = [];

  /**  
  * This function fetches all Pokemon types and initializes the global variable types by calling the REST Api.
  * 
  * The types are stored as Object.An additional attribute 'class' is added to the type-object. 
  * This 'class' attribute is the CSS selector that is used to show and hide the Pokemons when filtering them by type. 
  *  
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
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
            reject(err);
          }
        );
    });
    return promise;
  }
}