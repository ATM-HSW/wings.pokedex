package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import de.kubbillum.wings.pokedex.persistence.enums.Gender;

/**
 * Entity implementation class for Entity User.
 * 
 * @author Martin Kubbillum <m.kubbillum@stud.hs-wismar.de> 
 */
@Entity
@NamedQuery(name = PokedexUser.QUERY_GETALL, query = "SELECT c FROM PokedexUser c")
@NamedNativeQuery(name = PokedexUser.QUERY_GET_USER_BY_USERNAME, query = "SELECT * FROM PokedexUser c WHERE userName = ?", resultClass = PokedexUser.class)

@Table(name = "PokedexUser", uniqueConstraints = @UniqueConstraint(columnNames = { "userName" }))
public class PokedexUser implements Serializable {

	public static final String QUERY_GETALL = "PokedexUser.GetAll";
	public static final String QUERY_GET_USER_BY_USERNAME = "PokedexUser.GetUserByUserName";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@Size(min = 1, max = 100)
	private String userName;

	@NotNull
	@Size(max = 100)
	private String firstName;

	@NotNull
	@Size(max = 100)
	private String lastName;

	@NotNull
	private Gender gender;

	private LocalDate birthday;
	
	private String emailAdress;

	@Version
	@Column(name = "version")
	private int version;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "user_pokemons", joinColumns = @JoinColumn(name = "pokedexuser_id"), inverseJoinColumns = {
			@JoinColumn(name = "pokemon_dex"), @JoinColumn(name = "pokemon_shiny") })
	List<Pokemon> pokemons = new ArrayList<Pokemon>();

	public List<Pokemon> getPokemons() {
		return pokemons;
	}

	public void setPokemons(List<Pokemon> pokemons) {
		this.pokemons = pokemons;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public PokedexUser() {
		super();
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}

	public String getEmailAdress() {
		return emailAdress;
	}

	public void setEmailAdress(String emailAdress) {
		this.emailAdress = emailAdress;
	}
}