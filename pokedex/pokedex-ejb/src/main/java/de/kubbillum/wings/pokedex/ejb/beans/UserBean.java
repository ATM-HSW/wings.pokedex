package de.kubbillum.wings.pokedex.ejb.beans;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.kubbillum.wings.pokedex.ejb.interfaces.UserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.User;

@Stateless
@Remote(UserDAO.class)
public class UserBean implements UserDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public User create(User user) {
		em.persist(user);
		return user;
	}

	@Override
	public User update(User user) {
		return em.merge(user);
	}

	@Override
	public void remove(int id) {
		User toBeDeleted = getUser(id);
		em.remove(toBeDeleted);
	}

	@Override
	public User getUser(int id) {
		return em.find(User.class, id);
	}

	@Override
	public List<User> getAllUsers() {
		return em.createQuery(User.QUERY_GETALL, User.class).getResultList();
	}
}