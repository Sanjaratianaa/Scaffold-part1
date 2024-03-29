namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[pannier]]")]
public class PannierController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<PannierController> _logger;


	[HttpPost]
	public ActionResult<Pannier> save([FromBody] Pannier pannier){
	 	_context.Pannier.Add(pannier);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Pannier> update([FromBody] Pannier pannier){
	 	var temp = pannier;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Pannier> delete([FromBody] Pannier pannier){
	 	_context.Pannier.Remove(pannier);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public async Task<ActionResult<IEnumerable<Pannier>>> findAll(){
	 	var all = await _context.Pannier.Include(l => l.poketra).Include(l => l.personne).ToListAsync();
			return Ok(all);
	}

	public PannierController(ContextDbContext context) { _context = context; }



}
