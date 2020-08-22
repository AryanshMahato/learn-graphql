import { Arg, Mutation, Query, Resolver } from 'type-graphql';
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
  async post(@Arg('id') id: string): Promise<Post | undefined> {
    return await Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Arg('title') title: string): Promise<Post> {
    const post = new Post();
    post.title = title;
    return await post.save();
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('title') title: string,
    @Arg('id') id: string,
  ): Promise<Post | undefined> {
    const post = await Post.findOne(id);

    if (post) {
      post.title = title;
      return await post.save();
    }
    return;
  }
}
