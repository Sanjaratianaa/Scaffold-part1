namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("a_teeth_client")]
public class ATeethClient {

	[ForeignKey("id_client")]
	public Client IdClient { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("state")]
	public int State { get; set; }
	[ForeignKey("number_teeth")]
	public Teeth NumberTeeth { get; set; }




	public ATeethClient(){}



}
