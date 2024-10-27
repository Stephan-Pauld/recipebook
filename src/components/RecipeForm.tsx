import React from 'react';
import { useForm } from 'react-hook-form';
import { UtensilsCrossed, Link, ListPlus, MessageSquare } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_RECIPE } from '../lib/apollo';

interface RecipeFormData {
  title: string;
  referenceUrl: string;
  ingredients: string;
  message: string;
}

export default function RecipeForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RecipeFormData>();
  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE);

  const onSubmit = async (data: RecipeFormData) => {
    try {
      await createRecipe({
        variables: data
      });
      reset();
      alert('Recipe saved successfully!');
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-8">
        <UtensilsCrossed className="w-8 h-8 text-amber-600" />
        <h1 className="text-3xl font-bold text-gray-800">Family Recipe Collection</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          Error saving recipe. Please try again.
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-1">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Recipe Title</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Grandma's Famous Apple Pie"
          />
          {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-1">
            <Link className="w-4 h-4" />
            <span>Reference URL (optional)</span>
          </label>
          <input
            {...register("referenceUrl")}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="https://example.com/recipe"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-1">
            <ListPlus className="w-4 h-4" />
            <span>Ingredients</span>
          </label>
          <textarea
            {...register("ingredients", { required: "Ingredients are required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32"
            placeholder="- 2 cups flour&#10;- 1 cup sugar&#10;- 3 apples"
          />
          {errors.ingredients && <p className="mt-1 text-red-500 text-sm">{errors.ingredients.message}</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Story & Instructions</span>
          </label>
          <textarea
            {...register("message", { required: "Instructions are required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent h-48"
            placeholder="Share the story behind this recipe and how to make it..."
          />
          {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Recipe'}
        </button>
      </div>
    </form>
  );
}