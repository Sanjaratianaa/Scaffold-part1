namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[aTeethClient]]")]
public class ATeethClientController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<ATeethClientController> _logger;


	[HttpPost]
	public ActionResult<ATeethClient> save([FromBody] ATeethClient aTeethClient){
	 	_context.ATeethClient.Add(aTeethClient);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<ATeethClient> update([FromBody] ATeethClient aTeethClient){
	 	var temp = aTeethClient;
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<ATeethClient> delete([FromBody] ATeethClient aTeethClient){
	 	_context.ATeethClient.Remove(aTeethClient);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<ATeethClient>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.ATeethClient.Include(l => l.IdClient).Include(l => l.NumberTeeth).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.ATeethClient.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public ATeethClientController(ContextDbContext context) { _context = context; }



}
