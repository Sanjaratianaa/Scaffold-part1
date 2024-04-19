namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("livre")]
public class Livre {

	[Key]
	[Column("id_livre")]
	public int IdLivre { get; set; }
	[ForeignKey("id_auteur")]
	public Auteur IdAuteur { get; set; }
	[Column("titre")]
	public string Titre { get; set; }
	[ForeignKey("id_categories")]
	public Categories IdCategories { get; set; }
	[Column("description")]
	public string Description { get; set; }




	public Livre(){}



}
