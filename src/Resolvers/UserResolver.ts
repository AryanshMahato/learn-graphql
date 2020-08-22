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

// Generic Input for this Resolver
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

// Generic Response for this Resolver
@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class UserResolver {
  // Register User with username and password
  @Mutation(() => UserResponse)
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
      return {
        user: savedUser,
      };
    } catch (e) {
      // Cannot Register User
      return {
        errors: [{ field: 'username', message: 'Username is already taken!' }],
      };
    }
  }

  // Login User with username and password
  @Mutation(() => UserResponse)
  async loginUser(
    @Arg('options') options: UsernamePasswordInput,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });

    if (user) {
      const valid = await argon.verify(user.password, options.password);
      console.log(valid);
      if (valid) {
        // Authenticated
        return { user };
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
