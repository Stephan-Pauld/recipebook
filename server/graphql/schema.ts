import { makeExecutableSchema } from '@graphql-tools/schema';
import { Recipe } from '../models/Recipe';

const typeDefs = `
  type Recipe {
    id: ID!
    title: String!
    referenceUrl: String
    ingredients: String!
    message: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(
      title: String!
      referenceUrl: String
      ingredients: String!
      message: String!
    ): Recipe!
  }
`;

const resolvers = {
  Query: {
    recipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    },
    recipe: async (_, { id }) => {
      return await Recipe.findById(id);
    },
  },
  Mutation: {
    createRecipe: async (_, args) => {
      const recipe = new Recipe(args);
      await recipe.save();
      return recipe;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});