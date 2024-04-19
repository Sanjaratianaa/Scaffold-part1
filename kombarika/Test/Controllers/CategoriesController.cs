namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[categories]]")]
public class CategoriesController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<CategoriesController> _logger;


	[HttpPost]
	public ActionResult<Categories> save([FromBody] Categories categories){
	 	
		_context.Categories.Add(categories);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Categories> update([FromBody] Categories categories){
	 	var temp = categories;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Categories> delete([FromBody] Categories categories){
	 	_context.Categories.Remove(categories);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Categories>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Categories.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Categories.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public CategoriesController(ContextDbContext context) { _context = context; }



}
