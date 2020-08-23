import { EnvConfigProvider } from '../Providers/EnvConfigProvider';
import jwt from 'jsonwebtoken';
import { InvalidToken } from '../Errors/InvalidToken';
import redis from 'redis';
import { promisify } from 'util';
import { FailedToSave } from '../Errors/FailedToSave';
// Redis client initialization
const redisClient = redis.createClient();

export class JWTService {
  private static secret = EnvConfigProvider.getJwtSecret()!;

  // Authentication Token
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

    return await this.saveOnRedis(username, token);
  }

  // Static Method to verify token
  public static async verify(username: string, token: string): Promise<void> {
    try {
      jwt.verify(token, this.secret);
      await this.verifyOnRedis(username, token);
    } catch (e) {
      if (e instanceof InvalidToken) {
        throw e;
      }
      throw new InvalidToken('Token is invalid!');
    }
  }

  // Returns Username after taking token as input
  public static getUsername(token: string) {
    const decode = jwt.decode(token);

    // @ts-ignore
    return decode.username;
  }

  // Verify token from Redis
  private static async verifyOnRedis(
    username: string,
    token: string,
  ): Promise<string> {
    // Promisify Redis lrange() to use Promises in Code
    const lrange = promisify(redisClient.lrange).bind(redisClient);

    // Get tokens from redis
    const tokens = (await lrange(username, 0, -1)) || [];

    const isTokenInRedis = tokens.indexOf(token) >= 0;

    if (isTokenInRedis) {
      // Token is verified
      return token;
    }

    throw new InvalidToken('Token is not valid on Redis');
  }

  // Save Token on Redis
  private static async saveOnRedis(
    username: string,
    token: string,
  ): Promise<string> {
    // Promisify Redis rpush() to use Promises in Code
    const rpush = promisify(redisClient.rpush).bind(redisClient);

    // Push token to redis
    const pushed = await rpush([username, token]);

    if (pushed) {
      // Token Pushed to Redis
      return token;
    }
    throw new FailedToSave('Cannot store token to Redis');
  }
}
