namespace First_Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using First_Test.Context;
using First_Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[typeBanque]]")]
public class TypeBanqueController : Controller {

	private readonly FirstTest.ContextDbContext _context;
	private readonly ILogger<FirstTest.ContextController> _logger;


	[HttpPost]
	public ActionResult<TypeBanque> save([FromBody] TypeBanque typeBanque){
	 	_context.TypeBanque.Add(typeBanque);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<TypeBanque> update([FromBody] TypeBanque typeBanque){
	 	var temp = typeBanque;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<TypeBanque> delete([FromBody] TypeBanque typeBanque){
	 	_context.TypeBanque.Remove(typeBanque);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet]
	public ActionResult<IEnumerable<TypeBanque>> findAll(){
	 	var all = await _context.TypeBanque.ToListAsync();
			return Ok(all);
	}

	public TypeBanqueController(TypeBanqueDbContext context) { _context = context; }



}
