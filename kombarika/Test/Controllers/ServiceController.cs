namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[service]]")]
public class ServiceController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<ServiceController> _logger;


	[HttpPost]
	public ActionResult<Service> save([FromBody] Service service){
	 	_context.Service.Add(service);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Service> update([FromBody] Service service){
	 	var temp = service;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Service> delete([FromBody] Service service){
	 	_context.Service.Remove(service);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Service>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Service.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Service.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public ServiceController(ContextDbContext context) { _context = context; }



}
