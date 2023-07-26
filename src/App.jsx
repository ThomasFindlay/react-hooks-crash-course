import "./App.css";
import RecipeModal from "./components/RecipeModal";
import Recipes from "./components/Recipes";
import { RecipeContextProvider } from "./components/context/Recipe.context";

function App() {
  return (
    <>
      <div>
        <RecipeContextProvider>
          <Recipes />
          <RecipeModal />
        </RecipeContextProvider>
      </div>
    </>
  );
}

export default App;
