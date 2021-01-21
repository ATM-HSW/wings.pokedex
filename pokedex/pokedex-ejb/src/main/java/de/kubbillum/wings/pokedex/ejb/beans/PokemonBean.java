package de.kubbillum.wings.pokedex.ejb.beans;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokemonDAO;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;

@Stateless
@Remote(PokemonDAO.class)
public class PokemonBean implements PokemonDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Pokemon create(Pokemon pokemon) {
		em.persist(pokemon);
		return pokemon;
	}

	@Override
	public Pokemon update(Pokemon pokemon) {
		return em.merge(pokemon);
	}

	@Override
	public void remove(int id) {
		Pokemon toBeDeleted = getPokemon(id);
		em.remove(toBeDeleted);
	}

	@Override
	public Pokemon getPokemon(int id) {
		return em.find(Pokemon.class, id);
	}

	@Override
	public List<Pokemon> getAllPokemons() {
		return em.createQuery(Pokemon.QUERY_GETALL, Pokemon.class).getResultList();
	}
}