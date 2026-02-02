import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const { startDateTime, endDateTime, userId } = createEventDto;
    const now = new Date();

    // 1. Sanidade Temporal: Fim > Início
    if (endDateTime <= startDateTime) {
      throw new BadRequestException('A data de término deve ser posterior à data de início.');
    }

    // 2. Restrição de Passado: Início >= Agora
    if (startDateTime < now) {
      throw new BadRequestException('Não é possível agendar eventos no passado.');
    }

    // 3. Gestão de Conflitos (Overlap)
    const overlappingEvent = await this.prisma.event.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        AND: [
          { startDateTime: { lt: endDateTime } },
          { endDateTime: { gt: startDateTime } },
        ],
      },
    });

    if (overlappingEvent) {
      throw new BadRequestException('Conflito de agenda: o usuário já possui um evento ativo neste horário.');
    }

    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  // Requisito 3.2: Retorna todos os eventos do usuário em ordem cronológica
  async findAll(userId: number) {
    return this.prisma.event.findMany({
      where: { userId },
      orderBy: {
        startDateTime: 'asc',
      },
    });
  }

  // Ajustado: Busca um evento específico pelo ID único do evento
  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado.');
    }

    return event;
  }

  // Implementado: Permite atualizar dados do evento
  async update(id: number, updateEventDto: UpdateEventDto) {
    // Primeiro verifica se o evento existe
    await this.findOne(id);

    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  // Requisito 3.3: Cancelamento Lógico
  async remove(id: number) {
    const event = await this.findOne(id);

    // Regra: Não permitir cancelar eventos já finalizados (COMPLETED)
    if (event.status === 'COMPLETED') {
      throw new BadRequestException('Não é possível cancelar um evento que já foi concluído.');
    }

    return this.prisma.event.update({
      where: { id },
      data: { status: 'CANCELED' },
    });
  }
}