using Data.Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClienteController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        return Ok(await _context.Clientes.ToListAsync());
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> BuscarPorEmail(string email)
    {
        var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == email);
        if (cliente == null) return NotFound();
        return Ok(cliente);
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar(Cliente cliente)
    {
        if (string.IsNullOrWhiteSpace(cliente.Nome))
            return BadRequest("Nome é obrigatório.");

        if (string.IsNullOrWhiteSpace(cliente.Email) || !cliente.Email.Contains('@'))
            return BadRequest("E-mail inválido.");

        if (string.IsNullOrWhiteSpace(cliente.Telefone))
            return BadRequest("Telefone é obrigatório.");

        var emailExistente = await _context.Clientes.AnyAsync(c => c.Email == cliente.Email);
        if (emailExistente)
            return BadRequest("E-mail já cadastrado.");

        cliente.Id = Guid.NewGuid();
        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();
        return Ok(cliente);
    }
}