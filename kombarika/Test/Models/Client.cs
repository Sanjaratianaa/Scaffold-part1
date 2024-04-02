namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("client")]
public class Client {

	[Key]
	[Column("id_client")]
	public int IdClient { get; set; }
	[Column("montant")]
	public double Montant { get; set; }
	[Column("nom")]
	public string Nom { get; set; }




	public Client(){}



}
