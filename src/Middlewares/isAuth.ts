import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../Types/MyContext';
import { NotLogin } from '../Errors/NotLogin';
import { JWTService } from '../Services/JWTService';
import { InvalidToken } from '../Errors/InvalidToken';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const token = context.req.headers.authorization;
  // Authorization token is not passed
  if (!token) throw new NotLogin();

  try {
    const username = JWTService.getUsername(token);

    // Verifies if Auth Token is valid
    await JWTService.verify(username, token);
    return next();
  } catch (e) {
    throw new InvalidToken();
  }
};
