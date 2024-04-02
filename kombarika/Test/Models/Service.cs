namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("service")]
public class Service {

	[Column("reference")]
	public string Reference { get; set; }
	[Column("name")]
	public string Name { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }




	public Service(){}



}
