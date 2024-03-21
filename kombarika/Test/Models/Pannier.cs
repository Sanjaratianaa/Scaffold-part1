namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("pannier")]
public class Pannier {

	[ForeignKey("idpoketra")]
	public Poketra poketra { get; set; }
	[ForeignKey("idpersonne")]
	public Personne personne { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }




	public Pannier(){}



}
