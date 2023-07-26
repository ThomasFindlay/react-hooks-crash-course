import {
  useCallback,
  useDeferredValue,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ofetch } from "ofetch";
import { parseRecipes } from "../helpers/parseRecipe";
import { useRecipeContext } from "./context/Recipe.context";
import TextField from "./TextField";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

const initialState = {
  query: "",
  recipes: [],
};

const recipesReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
  }
  return state;
};

const Recipes = props => {
  // const [query, setQuery] = useState("");
  // const [recipes, setRecipes] = useState([]);
  const [{ recipes, query }, dispatch] = useReducer(
    recipesReducer,
    initialState
  );
  const deferredQuery = useDeferredValue(query);
  const textFieldRef = useRef();
  const abortControllerRef = useRef();
  const { selectedRecipe, setSelectedRecipe } = useRecipeContext();
  const fetchRecipes = async (query = "") => {
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const response = await ofetch(BASE_URL, {
      params: {
        s: query,
      },
      signal: abortController.signal,
    });
    const formattedRecipes = parseRecipes(response.meals);
    // setRecipes(formattedRecipes);
    console.log(formattedRecipes);
    dispatch({
      type: "SET_RECIPES",
      payload: formattedRecipes,
    });
  };

  const onQueryChange = useCallback(e => {
    const queryValue = e.target.value;
    // setQuery(queryValue);
    dispatch({
      type: "SET_QUERY",
      payload: queryValue,
    });
    fetchRecipes(queryValue);
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!selectedRecipe) return;
    return () => {
      textFieldRef.current?.focus();
    };
  }, [selectedRecipe]);

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-semibold mb-8">Recipes</h1>
      <form className="mb-8 max-w-sm mx-auto">
        <TextField
          label="Search Recipes"
          type="text"
          value={deferredQuery}
          onChange={onQueryChange}
          ref={textFieldRef}
        />
      </form>
      <ul className="grid grid-cols-4 gap-6">
        {recipes.map(recipe => {
          const { id, title, image, cuisine, category } = recipe;
          return (
            <li key={id}>
              <button
                className="p-4 shadow border rounded-sm w-full"
                type="button"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <img src={image} width="250" height="250" />
                <h2 className="text-lg font-semibold mt-2">{title}</h2>
                <span className="text-sm text-slate-600">
                  {cuisine} / {category}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Recipes;
