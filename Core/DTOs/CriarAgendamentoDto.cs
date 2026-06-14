namespace Core.DTOs;

public class CriarAgendamentoDto
{
    public Guid ClienteId { get; set; }

    public DateTime DataHora { get; set; }

    public List<Guid> ServicosIds { get; set; } = [];
}