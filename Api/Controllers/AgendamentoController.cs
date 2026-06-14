using Data.Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgendamentoController : ControllerBase
{
    private readonly AppDbContext _context;

    public AgendamentoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        return Ok(await _context.Agendamentos.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Criar(Agendamento agendamento)
    {
        agendamento.Id = Guid.NewGuid();

        _context.Agendamentos.Add(agendamento);

        await _context.SaveChangesAsync();

        return Ok(agendamento);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Cancelar(Guid id)
    {
        var agendamento = await _context.Agendamentos.FindAsync(id);

        if (agendamento == null)
            return NotFound();

        _context.Agendamentos.Remove(agendamento);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}