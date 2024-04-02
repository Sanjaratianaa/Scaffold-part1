namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[[client]]")]
public class ClientController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<ClientController> _logger;


	[HttpPost]
	public ActionResult<Client> save([FromBody] Client client){
	 	_context.Client.Add(client);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Client> update([FromBody] Client client){
	 	var temp = client;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Client> delete([FromBody] Client client){
	 	_context.Client.Remove(client);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Client>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Client.Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Client.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public ClientController(ContextDbContext context) { _context = context; }



}
