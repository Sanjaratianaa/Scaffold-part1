namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("a_traitement_states")]
public class ATraitementStates {

	[ForeignKey("ref_traitement")]
	public Traitement RefTraitement { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[ForeignKey("state")]
	public States State { get; set; }




	public ATraitementStates(){}



}
