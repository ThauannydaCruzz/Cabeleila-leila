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
        cliente.Id = Guid.NewGuid();
        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();
        return Ok(cliente);
    }
}