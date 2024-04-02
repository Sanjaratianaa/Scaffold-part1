namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("teeth")]
public class Teeth {

	[Column("numero")]
	public int Numero { get; set; }
	[Column("teeth_name")]
	public string TeethName { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[ForeignKey("type")]
	public TeethType Type { get; set; }




	public Teeth(){}



}
