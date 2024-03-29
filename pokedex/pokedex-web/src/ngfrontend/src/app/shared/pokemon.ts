/**
 * Class to type pokemons coming from the REST Api.
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>
 */
export class Pokemon {
    dex: string | undefined;
    shiny: boolean = false;
    de: string | undefined;
    en: string | undefined;
    fr: string | undefined;
    es: string | undefined;
    it: string | undefined;
    ja: string | undefined;
    ko: string | undefined;
    types = ['', ''];
    height = '';
    weight = '';
    url: string | undefined;
    url_front: string | undefined;
    regions: any = ['', '', '', '', '', '', '', ''];
    inCollection: boolean = false;
}



