export class DepositCommand {
  constructor(
    readonly cardNumber: string,
    readonly pin: number,
    readonly amount: number,
  ) {}
}
