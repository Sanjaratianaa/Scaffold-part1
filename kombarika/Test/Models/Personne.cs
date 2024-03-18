namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("personne")]
public class Personne {

	[Column("adresse")]
	public string Adresse { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("nom")]
	public string Nom { get; set; }
	[Column("prenom")]
	public string Prenom { get; set; }
	[Column("dtn")]
	public DateOnly Dtn { get; set; }




	public Personne(){}



}
