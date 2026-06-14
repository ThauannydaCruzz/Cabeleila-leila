using Domain.Enums;

namespace Core.DTOs;

public class AgendamentoDto
{
    public Guid Id { get; set; }

    public string ClienteNome { get; set; } = string.Empty;

    public DateTime DataHora { get; set; }

    public StatusAgendamento Status { get; set; }

    public List<string> Servicos { get; set; } = [];
}