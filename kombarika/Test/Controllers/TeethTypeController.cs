namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[teethType]]")]
public class TeethTypeController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<TeethTypeController> _logger;


	[HttpPost]
	public ActionResult<TeethType> save([FromBody] TeethType teethType){
	 	_context.TeethType.Add(teethType);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<TeethType> update([FromBody] TeethType teethType){
	 	var temp = teethType;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<TeethType> delete([FromBody] TeethType teethType){
	 	_context.TeethType.Remove(teethType);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<TeethType>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.TeethType.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.TeethType.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public TeethTypeController(ContextDbContext context) { _context = context; }



}
