import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor(public restApi: RestApiService, private http: HttpClient) {
    //this.getRegions();
  }
  spinnerIcon = '<i class="fas fa-sync fa-spin" data-original-title="" title="" style="color: #4e73df; font-size: 2rem;"></i> ';
  public loginUsername: any;
  public loginUserId: any;

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
    this.updateCounter(true, 400);
  }

  public updateCounter(disable: boolean, time: number) {
    document.getElementById("pokemonCounter")!.innerHTML = '<i class="fas fa-sync fa-spin" data-original-title="" title="" style="color: #4e73df; font-size: 2rem;"></i> ';
    if (disable) {
      setTimeout(function () {
        var pokemonCounter = document.querySelectorAll('.filter-all').length - document.querySelectorAll('.filter-all.hidden-true').length;
        document.getElementById("pokemonCounter")!.innerHTML = `${pokemonCounter}`;
      }, time);
    }
  }

  pokedexRegions: any;
  getRegions() {
    //this.pokemons = [898][2]; 
    this.restApi.getRegions().subscribe((data: any) => {
      this.pokedexRegions = data.results;
      for (let i = 0; i < this.pokedexRegions.length; i++) {
        this.pokedexRegions[i].class = `filter-region-${this.pokedexRegions[i].name}`;
      }
    });
  }
}