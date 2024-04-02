namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("states")]
public class States {

	[Key]
	[Column("id_states")]
	public int IdStates { get; set; }
	[Column("state_name")]
	public string StateName { get; set; }
	[Column("state")]
	public int State { get; set; }




	public States(){}



}
