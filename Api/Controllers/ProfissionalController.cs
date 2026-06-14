using Data.Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfissionalController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProfissionalController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        return Ok(await _context.Profissionais.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar(Profissional profissional)
    {
        _context.Profissionais.Add(profissional);
        await _context.SaveChangesAsync();

        return Ok(profissional);
    }
}