import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Cria a conexão com o Postgres usando o driver nativo 'pg'
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });

    // 2. Cria o adaptador do Prisma para esse driver
    const adapter = new PrismaPg(pool);

    // 3. Passa o adaptador para o construtor do PrismaClient (Obrigatório no Prisma 7)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}