import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositCommand } from './DepositCommand';
import { Inject } from '@nestjs/common';
import { ICardRepository } from 'src/Domain/Repository/ICardRepository';
import { IAccountRepository } from 'src/Domain/Repository/IAccountRepository';
import { CryptoService } from 'src/Shared/Domain/CryptoService';
import { Card } from 'src/Domain/Entity/Card';
import { NotValidPinError } from 'src/Domain/Error/NotValidPinError';

@CommandHandler(DepositCommand)
export class DepositCommandHanlder implements ICommandHandler<DepositCommand> {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  public async execute(command: DepositCommand): Promise<void> {
    const { cardNumber, pin, amount } = command;

    const card = await this.cardRepository.findOneByCardNumber(cardNumber);

    const isValidPin = await this.isValidPin(card, pin);

    if (!isValidPin) {
      throw new NotValidPinError();
    }

    const account = await this.accountRepository.findOneById(card.accountId());

    account.deposit(amount);
  }

  private async isValidPin(card: Card, pin: number): Promise<boolean> {
    return await this.cryptoService.compare(card.pin(), pin);
  }
}