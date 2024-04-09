namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[step]]")]
public class StepController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<StepController> _logger;


	[HttpPost]
	public ActionResult<Step> save([FromBody] Step step){
	 	_context.Step.Add(step);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Step> update([FromBody] Step step){
	 	var temp = step;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Step> delete([FromBody] Step step){
	 	_context.Step.Remove(step);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Step>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Step.Include(l => l.MinState).Include(l => l.MaxState).Include(l => l.TraitementToDo).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Step.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public StepController(ContextDbContext context) { _context = context; }



}
