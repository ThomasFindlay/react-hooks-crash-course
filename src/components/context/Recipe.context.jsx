import { createContext, useContext, useMemo, useState } from "react";

const RecipeContext = createContext();

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(
      `useRecipeContext must be used within RecipeContextProvider.`
    );
  }

  return context;
};

export const RecipeContextProvider = props => {
  const [selectedRecipe, setSelectedRecipe] = useState();

  const values = useMemo(() => {
    return { selectedRecipe, setSelectedRecipe };
  }, [selectedRecipe]);

  return (
    <RecipeContext.Provider value={values}>
      {props.children}
    </RecipeContext.Provider>
  );
};
