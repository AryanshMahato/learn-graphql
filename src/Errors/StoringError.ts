export class StoringError {
  message = 'Cannot Store data in Database';

  constructor(message?: string) {
    this.message = message || this.message;
    console.log(this.message);
  }
}
