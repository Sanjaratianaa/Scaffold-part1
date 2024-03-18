namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[poketra]]")]
public class PoketraController : Controller {

	private readonly Test.ContextDbContext _context;
	private readonly ILogger<PoketraController> _logger;


	[HttpPost]
	public ActionResult<Poketra> save([FromBody] Poketra poketra){
	 	_context.Poketra.Add(poketra);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Poketra> update([FromBody] Poketra poketra){
	 	var temp = poketra;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Poketra> delete([FromBody] Poketra poketra){
	 	_context.Poketra.Remove(poketra);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public ActionResult<IEnumerable<Poketra>> findAll(){
	 	var all = await _context.Poketra.ToListAsync();
			return Ok(all);
	}

	public PoketraController(PoketraDbContext context) { _context = context; }



}
