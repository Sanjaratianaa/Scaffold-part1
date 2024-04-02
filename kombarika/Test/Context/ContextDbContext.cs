namespace Test.Context;


using Models;
using Microsoft.EntityFrameworkCore;


public class ContextDbContext : DbContext {

	public DbSet<AClientTeeth> AClientTeeth { get; set; }
	public DbSet<ATeethClient> ATeethClient { get; set; }
	public DbSet<ATeethTraitement> ATeethTraitement { get; set; }
	public DbSet<ATraitementStates> ATraitementStates { get; set; }
	public DbSet<Client> Client { get; set; }
	public DbSet<Service> Service { get; set; }
	public DbSet<States> States { get; set; }
	public DbSet<Step> Step { get; set; }
	public DbSet<Teeth> Teeth { get; set; }
	public DbSet<TeethType> TeethType { get; set; }
	public DbSet<Traitement> Traitement { get; set; }




	public ContextDbContext(){}
	public ContextDbContext(DbContextOptions<ContextDbContext> options): base(options)
{}



}
