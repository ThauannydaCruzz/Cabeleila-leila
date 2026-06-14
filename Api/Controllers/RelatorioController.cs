using Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatorioController : ControllerBase
{
    private readonly AppDbContext _context;

    public RelatorioController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> ObterRelatorio()
    {
        var agendamentos = await _context.Agendamentos.ToListAsync();

        return Ok(new
        {
            TotalAgendamentos = agendamentos.Count,
            Agendamentos = agendamentos
        });
    }
}