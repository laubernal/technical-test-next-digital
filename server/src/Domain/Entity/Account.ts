export class Account {
  constructor(
    private readonly _id: string,
    private readonly _movements: string[],
    private readonly _balance: number,
    private readonly _cards: string[],
  ) {}

  public id(): string {
    return this._id;
  }

  public movements(): string[] {
    return this._movements;
  }

  public balance(): number {
    return this._balance;
  }

  public cards(): string[] {
    return this._cards;
  }
}
