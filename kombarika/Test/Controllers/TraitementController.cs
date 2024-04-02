namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[traitement]]")]
public class TraitementController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<TraitementController> _logger;


	[HttpPost]
	public ActionResult<Traitement> save([FromBody] Traitement traitement){
	 	_context.Traitement.Add(traitement);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Traitement> update([FromBody] Traitement traitement){
	 	var temp = traitement;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Traitement> delete([FromBody] Traitement traitement){
	 	_context.Traitement.Remove(traitement);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Traitement>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Traitement.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Traitement.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public TraitementController(ContextDbContext context) { _context = context; }



}
