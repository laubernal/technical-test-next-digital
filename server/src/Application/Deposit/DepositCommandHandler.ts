import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositCommand } from './DepositCommand';
import { Inject } from '@nestjs/common';
import { ICardRepository } from 'src/Domain/Repository/ICardRepository';
import { IAccountRepository } from 'src/Domain/Repository/IAccountRepository';

@CommandHandler(DepositCommand)
export class DepositCommandHanlder implements ICommandHandler<DepositCommand> {
  constructor(
    @Inject('ICardRepository') private readonly cardRepository: ICardRepository,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  public async execute(command: DepositCommand): Promise<void> {
    const { cardNumber, pin, amount } = command;

    // Check pin -> get card by cardNumber
    const card = await this.cardRepository.findOneByCardNumber(cardNumber);

    // Get account card number belongs -> get account by id
    const account = await this.accountRepository.findOneById(card.accountId());

    account.deposit(amount);
  }
}
