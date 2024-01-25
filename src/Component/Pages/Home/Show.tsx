/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetDatasQuery } from "../../../Redux/apis/api";

interface Recipe {
  recipe_name: string;
  ingredients: string[];
  cooking_method: string;
  rating: number;
}

interface Chef {
  id: number;
  chef_picture: string;
  chef_name: string;
  years_of_experience: number;
  number_of_recipes: number;
  recipes: Recipe[];
  likes: number;
  bio: string;
}

const Show = () => {
  const { data, isLoading } = useGetDatasQuery(undefined);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.map((chef: Chef) => (
        <div key={chef.id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={chef.chef_picture}
            alt={chef.chef_name}
            className="w-full h-32 object-cover mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">{chef.chef_name}</h2>
          <p className="text-gray-600 mb-4">{chef.bio}</p>
          <div className="mb-4">
            <p>Years of Experience: {chef.years_of_experience}</p>
            <p>Number of Recipes: {chef.number_of_recipes}</p>
            <p>Likes: {chef.likes}</p>
          </div>
          <div>
            {chef.recipes.map((recipe: Recipe) => (
              <div key={recipe.recipe_name} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {recipe.recipe_name}
                </h3>
                <p className="mb-2">{recipe.cooking_method}</p>
                <p className="text-gray-600">Rating: {recipe.rating}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Show;
