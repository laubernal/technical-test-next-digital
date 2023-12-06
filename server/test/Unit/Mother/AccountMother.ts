import { Account } from 'src/Domain/Entity/Account';
import { Card } from 'src/Domain/Entity/Card';

export class AccountMother {
  public static standard(): Account {
    return new Account('1', new Map([['DEPOSIT', 100]]), 100);
  }

  public static notFound(): undefined {
    return undefined;
  }
}
