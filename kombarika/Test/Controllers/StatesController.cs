namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[states]]")]
public class StatesController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<StatesController> _logger;


	[HttpPost]
	public ActionResult<States> save([FromBody] States states){
	 	_context.States.Add(states);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<States> update([FromBody] States states){
	 	var temp = states;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<States> delete([FromBody] States states){
	 	_context.States.Remove(states);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<States>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.States.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.States.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public StatesController(ContextDbContext context) { _context = context; }



}
