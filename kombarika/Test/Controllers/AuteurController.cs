namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[auteur]]")]
public class AuteurController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<AuteurController> _logger;


	[HttpPost]
	public ActionResult<Auteur> save([FromBody] Auteur auteur){
	 	
		_context.Auteur.Add(auteur);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Auteur> update([FromBody] Auteur auteur){
	 	var temp = auteur;
		  
		 _context.Auteur.Update(auteur); 
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Auteur> delete([FromBody] Auteur auteur){
	 	_context.Auteur.Remove(auteur);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Auteur>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Auteur.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Auteur.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public AuteurController(ContextDbContext context) { _context = context; }



}
