import { Field, InputType } from 'type-graphql';

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  sortOrder?: string;
}
