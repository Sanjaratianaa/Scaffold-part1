namespace Test.Controllers;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Test.Context;
using Test.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[[livre]]")]
public class LivreController : Controller {

	private readonly ContextDbContext _context;
	private readonly ILogger<LivreController> _logger;


	[HttpPost]
	public ActionResult<Livre> save([FromBody] Livre livre){
	 	var auteurName = livre.IdAuteur.IdAuteur;
		 var auteur = _context.Auteur.FirstOrDefault(a => a.IdAuteur == auteurName);
		 livre.IdAuteur = auteur;
		var categoriesName = livre.IdCategories.IdCategories;
		 var categories = _context.Categories.FirstOrDefault(a => a.IdCategories == categoriesName);
		 livre.IdCategories = categories;
		
		_context.Livre.Add(livre);
		_context.SaveChanges();
		return Ok();
	}
	[HttpPut]
	public ActionResult<Livre> update([FromBody] Livre livre){
	 	var temp = livre;
		 var auteurName = livre.IdAuteur.IdAuteur;
		 var auteur = _context.Auteur.FirstOrDefault(a => a.IdAuteur == auteurName);
		 livre.IdAuteur = auteur;
		var categoriesName = livre.IdCategories.IdCategories;
		 var categories = _context.Categories.FirstOrDefault(a => a.IdCategories == categoriesName);
		 livre.IdCategories = categories;
		 
		 _context.Livre.Update(livre); 
		_context.SaveChanges();
		return Ok();
	}
	[HttpDelete]
	public ActionResult<Livre> delete([FromBody] Livre livre){
	 	_context.Livre.Remove(livre);
		_context.SaveChanges();
		return Ok();
	}
	[HttpGet("{page?}")]
	public async Task<ActionResult<IEnumerable<Livre>>> findAll( int limit = 10, int page = 1){
	 	var all = await _context.Livre.Include(l => l.IdAuteur).Include(l => l.IdCategories).Skip( (page - 1) * limit ).Take(limit).ToListAsync();
		 	var count = await _context.Livre.CountAsync();
		 	 Response.Headers.Add("X-total-count", ""+count); 
		 	return Ok(all);
	}

	public LivreController(ContextDbContext context) { _context = context; }



}
