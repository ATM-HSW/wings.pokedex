import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})

/**  
* Definition of functions and attributes that must be globally available in all components and functions.
* 
* @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   .  
*/
export class GlobalFunctionsService {

  //The Counter ist set to this rotating spinner icon when the application is loading.
  spinnerIcon = '<i class="fas fa-sync fa-spin" data-original-title="" title="" style="color: #4e73df; font-size: 2rem;"></i> ';

  public loginUsername: any;
  public loginUserId: any;
  public loginUser: any;

  constructor(public restApi: RestApiService, private http: HttpClient) {
  }

  /**  
  * This function is filtering the Pokemons.
  * The Pokemons are filtered by showing and hiding them via CSS classes.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  * @param {Boolean} reset - Controls whether all filters should be reset before the passed filter is applied. 
  * @param event - The click event is used to localize the source element. The value of the data-filterclass attribute of the source element contains the new CSS class to filter for.  
  */
  public toggleSelection(reset: Boolean, event: any) {
    var selector = ".filter-all";
    var selectorAr = Array();

    if (reset) {
      document.querySelectorAll("#accordionSidebar a.filter.selected").forEach(element => {
        element.classList.remove("selected");
        var selector = ""
      });
    } else {
      if (event != null) {
        event.srcElement.classList.toggle("selected");
      }
      document.querySelectorAll("#accordionSidebar a.filter.selected").forEach(element => {
        selectorAr.push(element.getAttribute("data-filterclass"))
      });
    }

    if (selectorAr.length > 0) {
      selector = "." + selectorAr.join(".");
      document.querySelectorAll('.filter-all').forEach(element => element.classList.add('hidden-true'));
    }

    document.querySelectorAll(selector).forEach(element => element.classList.remove('hidden-true'));

    //After the filter has been applied, the Pokemon counter is updated
    this.updateCounter(true, 400);
  }


  /**  
  * This function is updating the Pokemon counter.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  * @param {boolean} disable - Controls whether the rotating spinnner icon should be displayed.
  * @param time - Controls after how many milliseconds the display should be updated.
  */
  public updateCounter(disable: boolean, time: number) {
    document.getElementById("pokemonCounter")!.innerHTML = '<i class="fas fa-sync fa-spin" data-original-title="" title="" style="color: #4e73df; font-size: 2rem;"></i> ';
    if (disable) {
      setTimeout(function () {
        var pokemonCounter = document.querySelectorAll('.filter-all').length - document.querySelectorAll('.filter-all.hidden-true').length;
        document.getElementById("pokemonCounter")!.innerHTML = `${pokemonCounter}`;
      }, time);
    }
  }

  // Global variable in which a list of the Pokemons regions are held. The HTML for the region filter is generated from this list. 
  pokedexRegions: any;

  /**  
  * This function fetches all Pokemon regions and initializes the global variable pokedexRegions
  * Before that, the system checks whether the regions are already available in the local web storage. 
  * If so, this is used. Otherwise the REST Api is called.
  * 
  * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>   
  */
  getRegions() {
    var stPokedexRegions = localStorage.getItem("stPokedexRegions");
    if (stPokedexRegions != null) {
      this.pokedexRegions = JSON.parse(stPokedexRegions);
    }
    if (this.pokedexRegions == null || this.pokedexRegions.length > 0) {
      this.restApi.getRegions().subscribe((data: any) => {
        this.pokedexRegions = data.results;
        for (let i = 0; i < this.pokedexRegions.length; i++) {
          this.pokedexRegions[i].class = `filter-region-${this.pokedexRegions[i].name}`;
          localStorage.setItem("stPokedexRegions", JSON.stringify(this.pokedexRegions));
        }
      });
    }
  }
}