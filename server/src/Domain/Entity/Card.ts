export class Card {
  constructor(
    private readonly _id: string,
    private readonly _cardNumber: string,
    private readonly _pin: number,
    private readonly _type: string,
    private readonly _isActive: boolean,
  ) {}

  public id(): string {
    return this._id;
  }

  public cardNumber(): string {
    return this._cardNumber;
  }

  public pin(): number {
    return this._pin;
  }

  public type(): string {
    return this._type;
  }

  public isActive(): boolean {
    return this._isActive;
  }
}
