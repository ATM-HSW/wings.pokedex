package de.kubbillum.wings.pokedex.web.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;
import de.kubbillum.wings.pokedex.persistence.entities.Pokemon;

@Path("/users")
@Stateless
public class UsersEndpoint {

	@EJB
	private PokedexUserDAO pokedexUserDAO;

	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<PokedexUser> getAll() {
		List<PokedexUser> users = pokedexUserDAO.getAllPokedexUsers();
		return users;

	}
	
	@GET
	@Path("/pokemons")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Pokemon> getPokemons() {
		List<Pokemon> pokemons = pokedexUserDAO.getAllPokedexUsers().get(0).getPokemons();
		return pokemons;
	}
//	public List<String> getAll() {
//		List<String> users = new ArrayList<String>();//pokedexUserDAO.getAllPokedexUsers();
//		users.add("abc1");
//		users.add("abc2");
//		users.add("abc3");
//		users.add("abc4");
//		users.add("abc5");
//		return users;
//		
//	}
}
