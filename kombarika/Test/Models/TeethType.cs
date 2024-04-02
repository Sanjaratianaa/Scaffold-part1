namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("teeth_type")]
public class TeethType {

	[Key]
	[Column("teeth_type")]
	public int TeethType { get; set; }
	[Column("name")]
	public string Name { get; set; }




	public TeethType(){}



}
