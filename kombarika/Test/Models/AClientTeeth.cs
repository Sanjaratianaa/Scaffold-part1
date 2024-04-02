namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("a_client_teeth")]
public class AClientTeeth {

	[ForeignKey("id_client")]
	public Client IdClient { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("state")]
	public int State { get; set; }
	[ForeignKey("number_teeth")]
	public Teeth NumberTeeth { get; set; }




	public AClientTeeth(){}



}
