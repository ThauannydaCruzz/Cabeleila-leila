using Data.Context;
using Microsoft.EntityFrameworkCore;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

using (var escopo = app.Services.CreateScope())
{
    var db = escopo.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Servicos.Any(s => s.AgendamentoId == null))
    {
        db.Servicos.AddRange(
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Corte Feminino", Preco = 80, DuracaoMinutos = 60 },
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Corte Masculino", Preco = 50, DuracaoMinutos = 30 },
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Coloração", Preco = 150, DuracaoMinutos = 120 },
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Escova", Preco = 60, DuracaoMinutos = 45 },
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Hidratação", Preco = 70, DuracaoMinutos = 60 },
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Manicure", Preco = 35, DuracaoMinutos = 40 },
            new Domain.Entities.Servico { Id = Guid.NewGuid(), Nome = "Pedicure", Preco = 40, DuracaoMinutos = 45 }
        );
        db.SaveChanges();
    }
}

app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();