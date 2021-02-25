package de.kubbillum.wings.pokedex.ejb.interfaces;

import java.util.concurrent.Future;
import de.kubbillum.wings.pokedex.persistence.entities.PokedexUser;

public interface MessageSender {

	public Future<Boolean> send(String subject, String body, PokedexUser user);

}
