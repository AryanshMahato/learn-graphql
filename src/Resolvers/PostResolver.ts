import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '../Entity/Post';
import { isAuth } from '../Middlewares/isAuth';

@Resolver()
export class PostResolver {
  // Get All Posts
  @Query(() => [Post])
  async posts() {
    return await Post.find();
  }

  // Get single Post By Id
  @UseMiddleware(isAuth)
  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: string): Promise<Post | undefined> {
    return await Post.findOne(id);
  }

  // Create Post
  @Mutation(() => Post)
  async createPost(@Arg('title') title: string): Promise<Post> {
    const post = new Post();
    post.title = title;
    return await post.save();
  }

  // Update Post by Id
  @Mutation(() => Post, { nullable: true })
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
