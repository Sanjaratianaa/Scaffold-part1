namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[personne]]")]
public class PersonneController : Controller {

	private readonly Test.ContextDbContext _context;
	private readonly ILogger<PersonneController> _logger;


	[HttpPost]
	public ActionResult<Personne> save([FromBody] Personne personne){
	 	_context.Personne.Add(personne);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Personne> update([FromBody] Personne personne){
	 	var temp = personne;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Personne> delete([FromBody] Personne personne){
	 	_context.Personne.Remove(personne);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public ActionResult<IEnumerable<Personne>> findAll(){
	 	var all = await _context.Personne.ToListAsync();
			return Ok(all);
	}

	public PersonneController(PersonneDbContext context) { _context = context; }



}
