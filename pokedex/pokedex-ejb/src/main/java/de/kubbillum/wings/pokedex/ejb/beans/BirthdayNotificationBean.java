package de.kubbillum.wings.pokedex.ejb.beans;

import java.util.List;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Schedule;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.jms.Destination;
import javax.jms.JMSContext;
import javax.jms.JMSDestinationDefinition;
import javax.jms.JMSDestinationDefinitions;
import javax.ejb.Singleton;

import de.kubbillum.wings.pokedex.ejb.interfaces.PokedexUserDAO;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

@Singleton
@Startup
@JMSDestinationDefinitions({
		@JMSDestinationDefinition(name = "java:global/jms/birthdayMailQueue", interfaceName = "javax.jms.Queue") })
public class BirthdayNotificationBean {

	@EJB
	private PokedexUserDAO pokedexUserDAO;
	
	@Inject
	private JMSContext context;
	
	@Resource(mappedName="java:global/jsm/birthdayMailQueue")
	private Destination birthdayDestination;

	@Schedule(hour = "9")
	private void checkBirthday() {
		List<PokedexUser> birthdays = pokedexUserDAO.getUsersHavingBirthday();
		for(PokedexUser user : birthdays) {
			context.createProducer().send(birthdayDestination, user);
		}
	}

}
