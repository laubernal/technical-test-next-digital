export class Account {
  private DEPOSIT_MOVEMENT = 'DEPOSIT';
  private WITHDRAW_MOVEMENT = 'WITHDRAW';
  private COMMISSION_MOVEMENT = 'COMMISSION';
  private TRANSFER_OUT_MOVEMENT = 'TRANSFER_OUT';
  private TRANSFER_IN_MOVEMENT = 'TRANSFER_IN';

  constructor(
    private _id: string,
    private _movements: Map<string, number>,
    private _balance: number,
  ) {}

  public id(): string {
    return this._id;
  }

  public movements(): Map<string, number> {
    return this._movements;
  }

  public balance(): number {
    return this._balance;
  }

  public deposit(amount: number): void {
    this._balance = this._balance + amount;

    if (this._movements.size) {
      this._movements.set(this.DEPOSIT_MOVEMENT, amount);
      return;
    }

    this._movements = new Map();

    this._movements.set(this.DEPOSIT_MOVEMENT, amount);
  }
}
