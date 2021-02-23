package de.kubbillum.wings.pokedex.ejb.interfaces;

import java.util.List;

import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;


public interface PokedexUserDAO {

	public PokedexUser create(PokedexUser user);
	
	public PokedexUser update(PokedexUser user);
	
	public void remove(int id);
	
	public PokedexUser getPokedexUser(int id);
	
	public PokedexUser getPokedexUserByUserName(String userName);
	
	public List<PokedexUser> getAllPokedexUsers();

	public List<PokedexUser> getUsersHavingBirthday();	
}
