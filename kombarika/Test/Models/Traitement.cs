namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("traitement")]
public class Traitement {

	[Column("reference")]
	public string Reference { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("real_price")]
	public double RealPrice { get; set; }
	[Column("nom")]
	public string Nom { get; set; }




	public Traitement(){}



}
