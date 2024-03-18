namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[pannier]]")]
public class PannierController : Controller {

	private readonly Test.ContextDbContext _context;
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
	public ActionResult<IEnumerable<Pannier>> findAll(){
	 	var all = await _context.Pannier.ToListAsync();
			return Ok(all);
	}

	public PannierController(PannierDbContext context) { _context = context; }



}
