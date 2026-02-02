import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateUserResponse() {
  return applyDecorators(
    ApiOperation({ summary: 'Cadastra um novo usuário no sistema' }),
    ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados inválidos enviados no corpo da requisição.' }),
    ApiResponse({ status: 409, description: 'Conflito: Este e-mail já está cadastrado.' }),
  );
}
