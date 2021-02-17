import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor() { }

  public toggleSelection(reset: Boolean, event: any) {
    var selector = ".filter-all";
    if (reset) {
      document.querySelectorAll("#accordionSidebar a.filter.selected").forEach(element => {
        element.classList.remove("selected");
        var selector = ""
      });
    } else {
      event.srcElement.classList.toggle("selected");
      var selectorAr = Array();
      document.querySelectorAll("#accordionSidebar a.filter.selected").forEach(element => {
        selectorAr.push(element.getAttribute("data-filterclass"))
      });
      selector = "." + selectorAr.join(".");
    }
    document.querySelectorAll('.filter-all').forEach(element => element.classList.add('hidden'));
    document.querySelectorAll(selector).forEach(element => element.classList.remove('hidden'));
    var pokemonCounter = document.querySelectorAll('.filter-all').length - document.querySelectorAll('.filter-all.hidden').length;
    document.getElementById("pokemonCounter")!.innerText = `${pokemonCounter}`;
  }
}