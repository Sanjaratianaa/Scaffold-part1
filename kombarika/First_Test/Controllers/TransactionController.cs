namespace First_Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using First_Test.Context;
using First_Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[transaction]]")]
public class TransactionController : Controller {

	private readonly FirstTest.ContextDbContext _context;
	private readonly ILogger<FirstTest.ContextController> _logger;


	[HttpPost]
	public ActionResult<Transaction> save([FromBody] Transaction transaction){
	 	_context.Transaction.Add(transaction);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Transaction> update([FromBody] Transaction transaction){
	 	var temp = transaction;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Transaction> delete([FromBody] Transaction transaction){
	 	_context.Transaction.Remove(transaction);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public ActionResult<IEnumerable<Transaction>> findAll(){
	 	var all = await _context.Transaction.Include(l => l.compte).ToListAsync();
			return Ok(all);
	}

	public TransactionController(TransactionDbContext context) { _context = context; }



}
