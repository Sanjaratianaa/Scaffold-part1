namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[aClientTeeth]]")]
public class AClientTeethController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<AClientTeethController> _logger;


	[HttpPost]
	public ActionResult<AClientTeeth> save([FromBody] AClientTeeth aClientTeeth){
	 	_context.AClientTeeth.Add(aClientTeeth);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<AClientTeeth> update([FromBody] AClientTeeth aClientTeeth){
	 	var temp = aClientTeeth;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<AClientTeeth> delete([FromBody] AClientTeeth aClientTeeth){
	 	_context.AClientTeeth.Remove(aClientTeeth);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<AClientTeeth>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.AClientTeeth.Include(l => l.IdClient).Include(l => l.NumberTeeth).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.AClientTeeth.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public AClientTeethController(ContextDbContext context) { _context = context; }



}
