export class InvalidToken {
  message = 'Invalid Token!';

  constructor(message?: string) {
    this.message = message || this.message;
  }
}
