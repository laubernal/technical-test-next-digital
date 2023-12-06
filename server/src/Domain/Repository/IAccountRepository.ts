import { Account } from '../Entity/Account';

export interface IAccountRepository {
  findOneById(id: string): Promise<Account>;

  save(account: Account): Promise<void>;
}
