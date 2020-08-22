import { Query, Resolver } from 'type-graphql';
import { Post } from '../Entity/Post';

@Resolver()
export class PostResolver {
  // Get All Posts
  @Query(() => [Post])
  async posts() {
    return await Post.find();
  }
}
