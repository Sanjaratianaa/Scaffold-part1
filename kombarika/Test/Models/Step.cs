namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("step")]
public class Step {

	[Key]
	[Column("id_step")]
	public int IdStep { get; set; }
	[ForeignKey("min_state")]
	public States MinState { get; set; }
	[Column("priority")]
	public int Priority { get; set; }
	[ForeignKey("max_state")]
	public States MaxState { get; set; }
	[ForeignKey("traitement_to_do")]
	public Traitement TraitementToDo { get; set; }




	public Step(){}



}
