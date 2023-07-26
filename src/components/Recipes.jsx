const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

const initialState = {
  query: "",
  recipes: [],
};

const Recipes = props => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-semibold mb-8">Recipes</h1>
    </div>
  );
};

export default Recipes;
