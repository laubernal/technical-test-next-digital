export class NotValidPinError extends Error {
  constructor() {
    super('Not valid pin provided');
  }
}
