namespace First_Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using First_Test.Context;
using First_Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[transfert]]")]
public class TransfertController : Controller {

	private readonly FirstTest.ContextDbContext _context;
	private readonly ILogger<FirstTest.ContextController> _logger;


	[HttpPost]
	public ActionResult<Transfert> save([FromBody] Transfert transfert){
	 	_context.Transfert.Add(transfert);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Transfert> update([FromBody] Transfert transfert){
	 	var temp = transfert;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Transfert> delete([FromBody] Transfert transfert){
	 	_context.Transfert.Remove(transfert);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public ActionResult<IEnumerable<Transfert>> findAll(){
	 	var all = await _context.Transfert.Include(l => l.compte).ToListAsync();
			return Ok(all);
	}

	public TransfertController(TransfertDbContext context) { _context = context; }



}
