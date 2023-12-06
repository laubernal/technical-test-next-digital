import { Card } from '../Entity/Card';

export interface ICardRepository {
  findOneByCardNumber(cardNumber: string): Promise<Card>;
}
