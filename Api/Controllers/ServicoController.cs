using Data.Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicoController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServicoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        return Ok(await _context.Servicos.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar(Servico servico)
    {
        _context.Servicos.Add(servico);
        await _context.SaveChangesAsync();

        return Ok(servico);
    }
}