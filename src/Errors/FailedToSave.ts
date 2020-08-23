export class FailedToSave extends Error {
  message = 'Cannot Save data in Database';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
    console.log(this.message);
  }
}
