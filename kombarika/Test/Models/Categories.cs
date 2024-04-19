namespace Test.Models;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



[Table("categories")]
public class Categories {

	[Key]
	[Column("id_categories")]
	public int IdCategories { get; set; }
	[Column("libele")]
	public string Libele { get; set; }




	public Categories(){}



}
