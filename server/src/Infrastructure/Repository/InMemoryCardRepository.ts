import { Card } from 'src/Domain/Entity/Card';
import { ICardRepository } from 'src/Domain/Repository/ICardRepository';

export class InMemoryCardRepository implements ICardRepository {
  public findOneByCardNumber(cardNumber: string): Promise<Card> {
    return Promise.resolve(
      new Card('1', cardNumber, '123', 'DEBIT', true, '1'),
    );
  }
}
