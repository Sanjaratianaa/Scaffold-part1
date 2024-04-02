namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[aTraitementStates]]")]
public class ATraitementStatesController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<ATraitementStatesController> _logger;


	[HttpPost]
	public ActionResult<ATraitementStates> save([FromBody] ATraitementStates aTraitementStates){
	 	_context.ATraitementStates.Add(aTraitementStates);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<ATraitementStates> update([FromBody] ATraitementStates aTraitementStates){
	 	var temp = aTraitementStates;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<ATraitementStates> delete([FromBody] ATraitementStates aTraitementStates){
	 	_context.ATraitementStates.Remove(aTraitementStates);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<ATraitementStates>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.ATraitementStates.Include(l => l.RefTraitement).Include(l => l.State).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.ATraitementStates.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public ATraitementStatesController(ContextDbContext context) { _context = context; }



}
