import { useRecipeContext } from "./context/Recipe.context";

const RecipeModal = props => {
  const { selectedRecipe, setSelectedRecipe } = useRecipeContext();
  console.log("selected recipe", selectedRecipe);
  if (!selectedRecipe) return null;
  const { title, category, cuisine, tags, image, instructions, ingredients } =
    selectedRecipe;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-2xl overflow-y-auto max-h-[90vh]">
        <img
          className="max-w-xs mx-auto"
          src={image}
          width="320"
          height="320"
        />

        <h2 className="text-lg font-semibold mt-2 ">{title}</h2>
        <span className="mb-3">
          {cuisine} / {category}
        </span>

        <h3 className="font-medium">Tags</h3>
        <span className="mb-3 block">{tags}</span>

        <h3 className="font-medium">Ingredients</h3>
        <span className="mb-3 block">{ingredients.join(", ")}</span>

        <h3 className="font-medium">Instructions</h3>
        <p className="mb-3 ">{instructions}</p>

        <button
          className="bg-blue-100 text-blue-600 px-4 py-3 rounded-md hover:bg-blue-200 hover:text-blue-700"
          onClick={() => setSelectedRecipe(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RecipeModal;
