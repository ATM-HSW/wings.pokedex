package de.kubbillum.wings.pokedex.ejb.interfaces;

import java.util.List;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

/**
 * The Data Access Object (DAO) is used to separate the data persistence logic in a
 * separate layer. The DAO hides the low-level operations to access the
 * database from the calling service (Seperation of Logic).
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de>
 */
public interface PokedexUserDAO {

	public PokedexUser create(PokedexUser user);

	public PokedexUser update(PokedexUser user);

	public void remove(int id);

	public PokedexUser getPokedexUser(int id);

	public PokedexUser getPokedexUserByUserName(String userName);

	public List<PokedexUser> getAllPokedexUsers();
}
