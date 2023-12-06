import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DepositController } from './Infrastructure/Controller/Deposit/DepositController';
import { DepositCommandHandler } from './Application/Deposit/DepositCommandHandler';
import { InMemoryCardRepository } from './Infrastructure/Repository/InMemoryCardRepository';
import { InMemoryAccountRepository } from './Infrastructure/Repository/InMemoryAccountRepository';
import { CryptoService } from './Shared/Domain/CryptoService';
import {
  IACCOUNT_REPOSITORY,
  ICARD_REPOSITORY,
} from './Shared/Domain/Constants';

const Controllers = [DepositController];

const CommandHandlers = [DepositCommandHandler];

const Repositories = [
  { provide: ICARD_REPOSITORY, useClass: InMemoryCardRepository },
  { provide: IACCOUNT_REPOSITORY, useClass: InMemoryAccountRepository },
];

const SharedServices = [CryptoService];

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [...CommandHandlers, ...Repositories, ...SharedServices],
})
export class AppModule {}
