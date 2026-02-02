// src/common/decorators/event-response.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiCreateEventResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo compromisso na agenda' }),
    ApiBody({ type: 'CreateEventDto' }), // Opcional, o Nest costuma detectar sozinho
    ApiResponse({ 
      status: 201, 
      description: 'Evento agendado com sucesso.' 
    }),
    ApiResponse({ 
      status: 400, 
      description: 'Regra de negócio violada: Conflito de horário, data no passado ou data de fim menor que início.' 
    }),
    ApiResponse({ 
      status: 404, 
      description: 'Usuário (dono do evento) não encontrado.' 
    }),
  );
}