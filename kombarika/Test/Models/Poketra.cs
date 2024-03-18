namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("poketra")]
public class Poketra {

	[Column("prix")]
	public double Prix { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("nom")]
	public string Nom { get; set; }




	public Poketra(){}



}
