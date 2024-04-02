namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("a_teeth_traitement")]
public class ATeethTraitement {

	[ForeignKey("ref_traitement")]
	public Traitement RefTraitement { get; set; }
	[Column("price")]
	public double Price { get; set; }
	[ForeignKey("teeth_number")]
	public Teeth TeethNumber { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }




	public ATeethTraitement(){}



}
