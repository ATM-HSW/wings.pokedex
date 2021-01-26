package de.kubbillum.wings.pokedex.ejb.beans;

import java.util.concurrent.Future;

import javax.annotation.Resource;
import javax.ejb.AsyncResult;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.websocket.RemoteEndpoint.Async;

import de.kubbillum.wings.pokedex.ejb.interfaces.MessageSender;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

@Stateless
@Remote(MessageSender.class)
public class MessageSenderBean implements MessageSender {

	private static final String DEFAULT_SENDER = "m.kubbillum@stud.hs-wismar.de";

	@Resource(name = "java:jboss/mail/HSWismar")
	private Session mailSession;

	@Override
	public Future<Boolean> send(String subject, String body, PokedexUser user) {
		boolean result = false;
		if (user.getEmailAdress() != null) {
			javax.mail.Message mail = new MimeMessage(mailSession);

			try {
				mail.setRecipients(javax.mail.Message.RecipientType.TO, InternetAddress.parse(user.getEmailAdress()));
				mail.setFrom(InternetAddress.parse(DEFAULT_SENDER)[0]);
				
				mail.setSubject(subject);
				mail.setText(body);
				
				Transport.send(mail);
				
				result = true;
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}
		return new AsyncResult<Boolean>(result);
	}
}
