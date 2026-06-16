using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers;
using Data.Context;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class ControllerTestes
{
    private AppDbContext CriarContexto() =>
        new AppDbContext(new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

    [Fact]
    public async Task Cliente_NomeVazio_RetornaBadRequest()
    {
        var resultado = await new ClienteController(CriarContexto())
            .Cadastrar(new Cliente { Nome = "", Email = "a@a.com", Telefone = "11999" });
        Assert.IsType<BadRequestObjectResult>(resultado);
    }

    [Fact]
    public async Task Cliente_EmailInvalido_RetornaBadRequest()
    {
        var resultado = await new ClienteController(CriarContexto())
            .Cadastrar(new Cliente { Nome = "Ana", Email = "invalido", Telefone = "11999" });
        Assert.IsType<BadRequestObjectResult>(resultado);
    }

    [Fact]
    public async Task Cliente_DadosValidos_RetornaOk()
    {
        var resultado = await new ClienteController(CriarContexto())
            .Cadastrar(new Cliente { Nome = "Ana", Email = "ana@a.com", Telefone = "11999" });
        Assert.IsType<OkObjectResult>(resultado);
    }

    [Fact]
    public async Task Agendamento_DataNoPassado_RetornaBadRequest()
    {
        var resultado = await new AgendamentoController(CriarContexto())
            .Criar(new Agendamento { DataHora = DateTime.Now.AddDays(-1), Servicos = new List<Servico> { new() } });
        Assert.IsType<BadRequestObjectResult>(resultado);
    }

    [Fact]
    public async Task Agendamento_SemServicos_RetornaBadRequest()
    {
        var resultado = await new AgendamentoController(CriarContexto())
            .Criar(new Agendamento { DataHora = DateTime.Now.AddDays(1), Servicos = new List<Servico>() });
        Assert.IsType<BadRequestObjectResult>(resultado);
    }

    [Fact]
    public async Task Agendamento_DadosValidos_RetornaOk()
    {
        var resultado = await new AgendamentoController(CriarContexto())
            .Criar(new Agendamento
            {
                DataHora = DateTime.Now.AddDays(1),
                Servicos = new List<Servico> { new() { Nome = "Corte", Preco = 50, DuracaoMinutos = 30 } }
            });
        Assert.IsType<OkObjectResult>(resultado);
    }

    [Fact]
    public async Task Servico_NomeVazio_RetornaBadRequest()
    {
        var resultado = await new ServicoController(CriarContexto())
            .Cadastrar(new Servico { Nome = "", Preco = 50, DuracaoMinutos = 30 });
        Assert.IsType<BadRequestObjectResult>(resultado);
    }

    [Fact]
    public async Task Servico_PrecoZero_RetornaBadRequest()
    {
        var resultado = await new ServicoController(CriarContexto())
            .Cadastrar(new Servico { Nome = "Corte", Preco = 0, DuracaoMinutos = 30 });
        Assert.IsType<BadRequestObjectResult>(resultado);
    }

    [Fact]
    public async Task Servico_DadosValidos_RetornaOk()
    {
        var resultado = await new ServicoController(CriarContexto())
            .Cadastrar(new Servico { Nome = "Corte", Preco = 50, DuracaoMinutos = 30 });
        Assert.IsType<OkObjectResult>(resultado);
    }
}
