package de.kubbillum.wings.pokedex.ejb.interfaces;

import java.util.List;

import de.kubbillum.wings.pokedex.persistence.entities.User;


public interface UserDAO {

	public User create(User user);
	
	public User update(User user);
	
	public void remove(int id);
	
	public User getUser(int id);
	
	public List<User> getAllUsers();	
}
