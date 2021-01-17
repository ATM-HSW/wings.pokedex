package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;
import java.security.Timestamp;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Entity implementation class for Entity: Family
 *
 */
@Entity

public class Family implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	

	@NotNull
	@Size(min = 1, max = 100)
	private String name;
	
	@Size(max = 3)
	private List<Pokemon> familyMembers;
	
	@Version
	private Timestamp lastChanged;
	

	public Family() {
		super();
	}


	public List<Pokemon> getFamilyMembers() {
		return familyMembers;
	}

	public void setFamilyMembers(List<Pokemon> familyMembers) {
		this.familyMembers = familyMembers;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}  
}