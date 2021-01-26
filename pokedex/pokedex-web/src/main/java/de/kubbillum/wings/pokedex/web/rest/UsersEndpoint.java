package de.kubbillum.wings.pokedex.web.rest;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

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
}
