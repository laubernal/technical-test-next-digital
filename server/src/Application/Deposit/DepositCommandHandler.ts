import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositCommand } from './DepositCommand';
import { Inject } from '@nestjs/common';
import { ICardRepository } from 'src/Domain/Repository/ICardRepository';
import { IAccountRepository } from 'src/Domain/Repository/IAccountRepository';
import { CryptoService } from 'src/Shared/Domain/CryptoService';
import { Card } from 'src/Domain/Entity/Card';
import { NotValidPinError } from 'src/Domain/Error/NotValidPinError';
import {
  IACCOUNT_REPOSITORY,
  ICARD_REPOSITORY,
} from 'src/Shared/Domain/Constants';
import { CardNotFoundError } from 'src/Domain/Error/CardNotFoundError';
import { Account } from 'src/Domain/Entity/Account';
import { AccountNotFoundError } from 'src/Domain/Error/AccountNotFoundError';

@CommandHandler(DepositCommand)
export class DepositCommandHandler implements ICommandHandler<DepositCommand> {
  constructor(
    @Inject(ICARD_REPOSITORY)
    private readonly cardRepository: ICardRepository,
    @Inject(IACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  public async execute(command: DepositCommand): Promise<void> {
    const { cardNumber, pin, amount } = command;

    const card = await this.cardRepository.findOneByCardNumber(cardNumber);

    this.ensureCardExists(card);

    await this.ensureIsValidPin(pin, card);

    const account = await this.accountRepository.findOneById(card.accountId());

    this.ensureAccountExists(account);

    account.deposit(amount);

    await this.accountRepository.save(account);
  }

  private ensureCardExists(card: Card | undefined): void {
    if (!card) {
      throw new CardNotFoundError();
    }
  }

  private async ensureIsValidPin(pin: number, card: Card): Promise<void> {
    const isValidPin = await this.cryptoService.compare(card.pin(), pin);

    if (!isValidPin) {
      throw new NotValidPinError();
    }
  }

  private ensureAccountExists(account: Account | undefined): void {
    if (!account) {
      throw new AccountNotFoundError();
    }
  }
}
