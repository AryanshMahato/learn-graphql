import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { User } from '../Entity/User';
import argon from 'argon2';
import { JWTService } from '../Services/JWTService';
import { FieldError } from '../Types/Errors';

// Generic Input for this Resolver
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

// Generic Response if Authentication is successful for this Resolver
interface AuthenticatedUserResponse {
  user: User;
  authToken: string;
}

// Generic Response if Authentication is not successful for this Resolver
interface UnAuthenticatedUserResponse {
  errors: FieldError[];
}

// Union of user responses for better type safety
type UserResponse = AuthenticatedUserResponse | UnAuthenticatedUserResponse;

// Return Object type for GraphQl
@ObjectType()
class GraphQLResponse {
  @Field(() => [FieldError], { nullable: true })
  errors: FieldError[];

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => String, { nullable: true })
  authToken: string;
}

//?================================ Main Class =================================
@Resolver()
export class UserResolver {
  // Register User with username and password
  @Mutation(() => GraphQLResponse)
  async registerUser(
    @Arg('options') options: UsernamePasswordInput,
  ): Promise<UserResponse> {
    // Few validations
    if (options.username.length <= 2) {
      return {
        errors: [{ field: 'username', message: 'Username is too short' }],
      };
    }

    if (options.password.length <= 3) {
      return {
        errors: [{ field: 'password', message: 'Password is too short' }],
      };
    }

    const hashedPassword = await argon.hash(options.password);

    const user = new User();
    user.username = options.username;
    user.password = hashedPassword;

    try {
      // User Registered Successfully
      const savedUser = await user.save();

      // Generate Token
      const authToken = await JWTService.generateToken(options.username);
      return {
        user: savedUser,
        authToken,
      };
    } catch (e) {
      // Cannot Register User
      return {
        errors: [{ field: 'username', message: 'Username is already taken!' }],
      };
    }
  }

  // Login User with username and password
  @Mutation(() => GraphQLResponse)
  async loginUser(
    @Arg('options') options: UsernamePasswordInput,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });

    if (user) {
      const valid = await argon.verify(user.password, options.password);
      if (valid) {
        // Authenticated & Generating tokens
        const authToken = await JWTService.generateToken(options.username);

        return {
          user,
          authToken,
        };
      }
      // Authentication failed
      return { errors: [{ field: 'password', message: 'Password is wrong' }] };
    }

    // User not found
    return {
      errors: [
        { field: 'username', message: 'Email or Password is wrong' },
        { field: 'password', message: 'Email or Password is wrong' },
      ],
    };
  }
}
