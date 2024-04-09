namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[teeth]]")]
public class TeethController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<TeethController> _logger;


	[HttpPost]
	public ActionResult<Teeth> save([FromBody] Teeth teeth){
	 	_context.Teeth.Add(teeth);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Teeth> update([FromBody] Teeth teeth){
	 	var temp = teeth;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Teeth> delete([FromBody] Teeth teeth){
	 	_context.Teeth.Remove(teeth);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Teeth>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Teeth.Include(l => l.Type).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Teeth.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public TeethController(ContextDbContext context) { _context = context; }



}
