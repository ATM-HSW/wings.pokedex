package de.kubbillum.wings.pokedex.ejb.beans;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

@Stateless
@Remote(PokedexUserDAO.class)
public class PokedexUserBean implements PokedexUserDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public PokedexUser create(PokedexUser user) {
		em.persist(user);
		return user;
	}

	@Override
	public PokedexUser update(PokedexUser user) {
		return em.merge(user);
	}

	@Override
	public void remove(int id) {
		PokedexUser toBeDeleted = getPokedexUser(id);
		em.remove(toBeDeleted);
	}

	@Override
	public PokedexUser getPokedexUser(int id) {
		return em.find(PokedexUser.class, id);
	}

	@Override
	public List<PokedexUser> getAllPokedexUsers() {
//		return em.createQuery("SELECT c FROM PokedexUser c", PokedexUser.class).getResultList();//
		return em.createNamedQuery(PokedexUser.QUERY_GETALL, PokedexUser.class).getResultList();//
	}

	@Override
	public List<PokedexUser> getUsersHavingBirthday() {
		LocalDate today = LocalDate.now();
		return em.createNamedQuery(PokedexUser.QUERY_GETBIRTHDAYS, PokedexUser.class).setParameter(1, today.getDayOfMonth()).setParameter(2, today.getMonthValue()).getResultList();
	}

	@Override
	public PokedexUser getPokedexUserByUserName(String userName) {
		return em.createNamedQuery(PokedexUser.QUERY_GET_USER_BY_USERNAME, PokedexUser.class).setParameter(1, userName).getResultList().get(0);
	}
}