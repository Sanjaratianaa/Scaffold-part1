namespace First_Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("transfert")]
public class Transfert {

	[Column("montantenvoye")]
	public double Montantenvoye { get; set; }
	[Column("date")]
	public DateOnly Date { get; set; }
	[ForeignKey("idcompte")]
	public Compte compte { get; set; }
	[Column("montantrecu")]
	public double Montantrecu { get; set; }
	[Column("description")]
	public string Description { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("destinataire")]
	public double Destinataire { get; set; }
	[Column("devise")]
	public int Devise { get; set; }
	[Column("envoyeur")]
	public double Envoyeur { get; set; }




	public Transfert(){}



}
