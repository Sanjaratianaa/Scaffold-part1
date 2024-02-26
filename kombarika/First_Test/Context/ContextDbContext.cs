namespace First_Test.Context;


using Models;
using Microsoft.EntityFrameworkCore;


public class ContextDbContext : DbContext {

	public DbSet<Compte> Compte { get; set; }
	public DbSet<Transaction> Transaction { get; set; }
	public DbSet<Transfert> Transfert { get; set; }
	public DbSet<TypeBanque> TypeBanque { get; set; }




	public ContextDbContext(){}
	public ContextDbContext(DbContextOptions<ContextDbContext> options): base(options)
{}



}
