export class NotLogin extends Error {
  message = 'User not logged in';

  constructor(message?: string) {
    super(message);
    console.log(this.message);
  }
}
