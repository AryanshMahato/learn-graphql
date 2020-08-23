export class InvalidToken extends Error {
  message = 'Invalid Token!';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
    console.log(this.message);
  }
}
