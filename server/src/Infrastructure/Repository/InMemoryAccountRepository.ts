import { Account } from 'src/Domain/Entity/Account';
import { IAccountRepository } from 'src/Domain/Repository/IAccountRepository';

export class InMemoryAccountRepository implements IAccountRepository {
  public findOneById(id: string): Promise<Account> {
    const movements = new Map();

    return Promise.resolve(new Account(id, movements, 0));
  }
}
