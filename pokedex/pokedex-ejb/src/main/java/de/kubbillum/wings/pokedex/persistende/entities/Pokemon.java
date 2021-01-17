package de.kubbillum.wings.pokedex.persistende.entities;

import java.io.Serializable;
import javax.persistence.*;

import de.kubbillum.wings.pokedex.persistende.enums.Family;
import de.kubbillum.wings.pokedex.persistende.enums.Type;

/**
 * Entity implementation class for Entity: Pokemon
 *
 */
@Entity

public class Pokemon implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long dex;
	
    private String nameDe;
    
    private String nameEn;
    
    private String nameFr;
    
    private String nameJa;
    
    private String nameKr;
    
    private String nameZh;   
    
	private Type type;
    
    private Boolean shinyReleased;
    
    private Family family;

	public Long getDex() {
		return dex;
	}

	public void setDex(Long dex) {
		this.dex = dex;
	}

	public String getNameDe() {
		return nameDe;
	}

	public void setNameDe(String nameDe) {
		this.nameDe = nameDe;
	}

	public String getNameEn() {
		return nameEn;
	}

	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}

	public String getNameFr() {
		return nameFr;
	}

	public void setNameFr(String nameFr) {
		this.nameFr = nameFr;
	}

	public String getNameJa() {
		return nameJa;
	}

	public void setNameJa(String nameJa) {
		this.nameJa = nameJa;
	}

	public String getNameKr() {
		return nameKr;
	}

	public void setNameKr(String nameKr) {
		this.nameKr = nameKr;
	}

	public String getNameZh() {
		return nameZh;
	}

	public void setNameZh(String nameZh) {
		this.nameZh = nameZh;
	}

	public Pokemon() {
		super();
	}
	
	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Boolean getShinyReleased() {
		return shinyReleased;
	}

	public void setShinyReleased(Boolean shinyReleased) {
		this.shinyReleased = shinyReleased;
	}

	public Family getFamily() {
		return family;
	}

	public void setFamily(Family family) {
		this.family = family;
	}
}