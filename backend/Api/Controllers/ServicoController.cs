using Data.Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
        return Ok(await _context.Servicos.Where(s => s.AgendamentoId == null).ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar(Servico servico)
    {
        if (string.IsNullOrWhiteSpace(servico.Nome))
            return BadRequest("Nome é obrigatório.");

        if (servico.Preco <= 0)
            return BadRequest("Preço deve ser maior que zero.");

        if (servico.DuracaoMinutos <= 0)
            return BadRequest("Duração deve ser maior que zero.");

        servico.Id = Guid.NewGuid();
        _context.Servicos.Add(servico);
        await _context.SaveChangesAsync();
        return Ok(servico);
    }
}