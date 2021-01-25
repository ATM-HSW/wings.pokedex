package de.kubbillum.wings.pokedex.ejb.beans;

import javax.ejb.Startup;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.ejb.interfaces.PokemonDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;
import de.kubbillum.wings.pokedex.persistence.enums.Gender;

import java.time.LocalDate;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;

@Singleton 
@Startup
public class InitializationBean {

	@EJB
	private PokemonDAO pokemonDao;
	
	@EJB
	private PokedexUserDAO pokedexUserDAO;
	
	@PostConstruct
	private void initialize() {
		if(pokemonDao.getAllPokemons().size() == 0) {
			PokedexUser user = new PokedexUser();
			user.setFirstName("Martin");
			user.setLastName("Mustermann");
			user.setGender(Gender.Male);
			user.setUserName("m.kubbillum");
			user.setBirthday(LocalDate.parse("1984-01-25"));
			PokedexUser resultUser = pokedexUserDAO.create(user);
			
			Pokemon pokemon = new Pokemon();
			pokemon.setDex(99);
			pokemon.setShiny(true);			
			Pokemon resultPokemon = pokemonDao.create(pokemon);
		
			resultUser.getPokemons().add(resultPokemon);
			
			pokedexUserDAO.update(resultUser);				
		}
	}
	
}
