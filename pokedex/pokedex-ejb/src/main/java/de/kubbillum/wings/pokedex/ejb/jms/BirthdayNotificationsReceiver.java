package de.kubbillum.wings.pokedex.ejb.jms;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;

import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

@MessageDriven(activationConfig = {
		@ActivationConfigProperty(propertyName = "destiniation", propertyValue = "java:global/jms/birthdayMailQueue") })
public class BirthdayNotificationsReceiver implements MessageListener {

	@Override
	public void onMessage(Message message) {
		if(message instanceof ObjectMessage) {
			try {
				PokedexUser user = message.getBody(PokedexUser.class);
			} catch (JMSException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
