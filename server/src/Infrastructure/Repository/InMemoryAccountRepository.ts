import { Account } from 'src/Domain/Entity/Account';
import { IAccountRepository } from 'src/Domain/Repository/IAccountRepository';
import { Database } from 'src/Shared/Infrastructure/Database';

export class InMemoryAccountRepository implements IAccountRepository {
  public async findOneById(id: string): Promise<Account> {
    const accountTable = Database.account_table;

    const result = accountTable.find((table) => table.id === id);

    const movements = new Map(result.movements as [[string, number]]);

    return Promise.resolve(new Account(result.id, movements, result.balance));
  }

  public async save(account: Account): Promise<void> {
    const accountTable = Database.account_table;

    const movements = [];

    for (const [movementType, amount] of account.movements().entries()) {
      movements.push([movementType, amount]);
    }

    accountTable.push({
      id: account.id(),
      movements,
      balance: account.balance(),
    });
  }
}
