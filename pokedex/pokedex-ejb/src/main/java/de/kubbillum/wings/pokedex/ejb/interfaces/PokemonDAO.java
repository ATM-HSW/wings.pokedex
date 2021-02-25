package de.kubbillum.wings.pokedex.ejb.interfaces;

import java.util.List;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;
import de.kubbillum.wings.pokedex.persistence.entities.PokemonId;

/**
 * The Data Access Object (DAO) is used to separate the data persistence logic in a
 * separate layer. The DAO hides the low-level operations to access the
 * database from the calling service (Seperation of Logic).
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>
 */
public interface PokemonDAO {

	public Pokemon create(Pokemon pokemon);

	public Pokemon update(Pokemon pokemon);

	public void remove(PokemonId id);

	public Pokemon getPokemon(PokemonId id);

	public List<Pokemon> getAllPokemons();
}