import { Card } from 'src/Domain/Entity/Card';
import { ICardRepository } from 'src/Domain/Repository/ICardRepository';
import { CryptoService } from 'src/Shared/Domain/CryptoService';

export class InMemoryCardRepository implements ICardRepository {
  public findOneByCardNumber(cardNumber: string): Promise<Card> {
    return Promise.resolve(
      new Card(
        '1',
        cardNumber,
        'd2f484502e7e59838a2dc132b4b4c94861e03b15ad549a4536ce8eeb5c33148ab4e2af657236ff15cc9ec22d6641b97d6d7bd2e362f37619a532ca50194cbeee-01bb80e76ade948a',
        'DEBIT',
        true,
        '1',
      ),
    );
  }
}
