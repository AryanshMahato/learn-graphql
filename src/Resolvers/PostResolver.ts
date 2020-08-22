import { Arg, Query, Resolver } from 'type-graphql';
import { Post } from '../Entity/Post';

@Resolver()
export class PostResolver {
  // Get All Posts
  @Query(() => [Post])
  async posts() {
    return await Post.find();
  }

  // Get single Post By Id
  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => String) id: string): Promise<Post | undefined> {
    return await Post.findOne(id);
  }
}
