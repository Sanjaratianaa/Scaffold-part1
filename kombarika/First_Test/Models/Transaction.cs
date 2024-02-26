namespace First_Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("transaction")]
public class Transaction {

	[Column("date_transaction")]
	public DateOnly DateTransaction { get; set; }
	[ForeignKey("idcompte")]
	public Compte compte { get; set; }
	[Column("description")]
	public string Description { get; set; }
	[Column("montant")]
	public double Montant { get; set; }
	[Key]
	[Column("id")]
	public int Id { get; set; }
	[Column("type_transaction")]
	public int TypeTransaction { get; set; }




	public Transaction(){}



}
