import { EnvConfigProvider } from '../Providers/EnvConfigProvider';
import jwt from 'jsonwebtoken';
import { InvalidToken } from '../Errors/InvalidToken';

export class JWTService {
  private static secret = EnvConfigProvider.getJwtSecret()!;

  public token: string;

  // Static Method to generate and store token
  public static async generateToken(username: string): Promise<string> {
    const token = jwt.sign(
      {
        username: username,
      },
      this.secret,
      { expiresIn: '1y' },
    );

    return await this.saveOnRedis(token);
  }

  // Static Method to verify token
  public static async verify(token: string) {
    const decoded = jwt.verify(token, this.secret);

    if (await this.verifyOnRedis(token)) return decoded;

    throw new InvalidToken('Token is invalid!');
  }

  // Verify token from Redis
  private static async verifyOnRedis(token: string): Promise<string> {
    console.log(token);
    return token;
  }

  // Save Token on Redis
  private static async saveOnRedis(token: string): Promise<string> {
    console.log(token);
    return token;
  }
}
