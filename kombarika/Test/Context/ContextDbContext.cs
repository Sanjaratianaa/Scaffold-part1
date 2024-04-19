namespace Test.Context;


using Models;
using Microsoft.EntityFrameworkCore;


public class ContextDbContext : DbContext {

	public DbSet<Auteur> Auteur { get; set; }
	public DbSet<Categories> Categories { get; set; }
	public DbSet<Livre> Livre { get; set; }




	public ContextDbContext(){}
	public ContextDbContext(DbContextOptions<ContextDbContext> options): base(options)
{}



}
