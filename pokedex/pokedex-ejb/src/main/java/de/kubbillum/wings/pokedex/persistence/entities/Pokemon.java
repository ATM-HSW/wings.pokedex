package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;
import java.security.Timestamp;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import de.kubbillum.wings.pokedex.persistence.enums.Type;

/**
 * Entity implementation class for Entity: Pokemon
 *
 */

@Entity
@NamedQuery(name = Pokemon.QUERY_GETALL, query = "SELECT c FROM Pokemon c")
@Table(name = "Pokemon")
public class Pokemon implements Serializable {

	public static final String QUERY_GETALL = "Pokemon.GetAll";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long dex;

	@NotNull
	@Size(min = 1, max = 100)
	private String nameDe;

	@NotNull
	@Size(min = 1, max = 100)
	private String nameEn;

	@NotNull
	@Size(min = 1, max = 100)
	private String nameFr;

	@NotNull
	@Size(min = 1, max = 100)
	private String nameJa;

	@NotNull
	@Size(min = 1, max = 100)
	private String nameKr;

	@NotNull
	@Size(min = 1, max = 100)
	private String nameZh;

//	@Size(min = 1, max = 2)
//	private List<Type> types;

	private Boolean shinyReleased;

//    @NotNull
//    private Family family;

	@Version
	@Column(name = "version")
	private int version;

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

	public Boolean getShinyReleased() {
		return shinyReleased;
	}

	public void setShinyReleased(Boolean shinyReleased) {
		this.shinyReleased = shinyReleased;
	}

//	public Family getFamily() {
//		return family;
//	}
//
//	public void setFamily(Family family) {
//		this.family = family;
//	}

//	public List<Type> getTypes() {
//		return types;
//	}
//
//	public void setTypes(List<Type> types) {
//		this.types = types;
//	}
}