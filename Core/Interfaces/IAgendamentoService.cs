using Core.DTOs;

namespace Core.Interfaces;

public interface IAgendamentoService
{
    Task<AgendamentoDto> CriarAsync(CriarAgendamentoDto dto);

    Task<List<AgendamentoDto>> ListarAsync();

    Task<AgendamentoDto?> BuscarPorIdAsync(Guid id);

    Task<bool> ConfirmarAsync(Guid id);

    Task<bool> CancelarAsync(Guid id);
}