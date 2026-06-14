using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Agendamento
{
    public Guid Id { get; set; }

    public Guid ClienteId { get; set; }

    public DateTime DataHora { get; set; }

    public StatusAgendamento Status { get; set; }

    public string Observacao { get; set; } = string.Empty;

    public List<Servico> Servicos { get; set; } = [];
}