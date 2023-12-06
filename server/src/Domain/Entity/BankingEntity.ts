export class BankingEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _accounts: string[],
  ) {}

  public id(): string {
    return this._id;
  }

  public name(): string {
    return this._name;
  }
  
  public accounts(): string[] {
    return this._accounts;
  }
}
