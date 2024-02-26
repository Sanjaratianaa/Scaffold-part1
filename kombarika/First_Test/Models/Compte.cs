namespace First_Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("compte")]
public class Compte {

	[Column("numero")]
	public double Numero { get; set; }
	[ForeignKey("id_type_banque")]
	public TypeBanque typeBanque { get; set; }
	[Column("numero_cin")]
	public double NumeroCin { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }




	public Compte(){}



}
