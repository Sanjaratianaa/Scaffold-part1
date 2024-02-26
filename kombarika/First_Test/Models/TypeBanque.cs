namespace First_Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("type_banque")]
public class TypeBanque {

	[Column("acronyme")]
	public string Acronyme { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("nom")]
	public string Nom { get; set; }




	public TypeBanque(){}



}
