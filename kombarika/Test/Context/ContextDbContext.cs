namespace Test.Context;


using Models;
using Microsoft.EntityFrameworkCore;


public class ContextDbContext : DbContext {

	public DbSet<Pannier> Pannier { get; set; }
	public DbSet<Personne> Personne { get; set; }
	public DbSet<Poketra> Poketra { get; set; }




	// public ContextDbContext(){}
	public ContextDbContext(DbContextOptions<ContextDbContext> options): base(options)
{}



}
