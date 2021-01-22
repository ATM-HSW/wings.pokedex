package de.kubbillum.wings.pokedex.ejb.interfaces;

import java.util.List;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;
import de.kubbillum.wings.pokedex.persistence.entities.PokemonId;

public interface PokemonDAO {

	public Pokemon create(Pokemon pokemon);

	public Pokemon update(Pokemon pokemon);

	//public void remove(int id);
	public void remove(PokemonId id);

	//public Pokemon getPokemon(int id);
	public Pokemon getPokemon(PokemonId id);

	public List<Pokemon> getAllPokemons();

	
}