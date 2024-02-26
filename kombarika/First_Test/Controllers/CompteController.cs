namespace First_Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using First_Test.Context;
using First_Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[compte]]")]
public class CompteController : Controller {

	private readonly FirstTest.ContextDbContext _context;
	private readonly ILogger<FirstTest.ContextController> _logger;


	[HttpPost]
	public ActionResult<Compte> save([FromBody] Compte compte){
	 	_context.Compte.Add(compte);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Compte> update([FromBody] Compte compte){
	 	var temp = compte;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Compte> delete([FromBody] Compte compte){
	 	_context.Compte.Remove(compte);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public ActionResult<IEnumerable<Compte>> findAll(){
	 	var all = await _context.Compte.Include(l => l.typeBanque).ToListAsync();
			return Ok(all);
	}

	public CompteController(CompteDbContext context) { _context = context; }



}
