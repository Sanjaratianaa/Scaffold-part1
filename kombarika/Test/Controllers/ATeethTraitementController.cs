namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[aTeethTraitement]]")]
public class ATeethTraitementController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<ATeethTraitementController> _logger;


	[HttpPost]
	public ActionResult<ATeethTraitement> save([FromBody] ATeethTraitement aTeethTraitement){
	 	_context.ATeethTraitement.Add(aTeethTraitement);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<ATeethTraitement> update([FromBody] ATeethTraitement aTeethTraitement){
	 	var temp = aTeethTraitement;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<ATeethTraitement> delete([FromBody] ATeethTraitement aTeethTraitement){
	 	_context.ATeethTraitement.Remove(aTeethTraitement);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<ATeethTraitement>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.ATeethTraitement.Include(l => l.RefTraitement).Include(l => l.TeethNumber).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.ATeethTraitement.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public ATeethTraitementController(ContextDbContext context) { _context = context; }



}
