namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("auteur")]
public class Auteur {

	[Key]
	[Column("id_auteur")]
	public int IdAuteur { get; set; }
	[Column("nom")]
	public string Nom { get; set; }
	[Column("prenom")]
	public string Prenom { get; set; }
	[Column("dtn")]
	public DateOnly Dtn { get; set; }




	public Auteur(){}



}
