import { Field, ObjectType } from 'type-graphql';

// Response used to specify errors in input fields
@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
