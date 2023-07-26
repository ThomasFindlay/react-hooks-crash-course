const extractIngredients = recipe => {
  return Object.entries(recipe).reduce((acc, [key, value]) => {
    if (key.startsWith("strIngredient") && value) {
      acc.push(value);
    }
    return acc;
  }, []);
};

export const parseRecipes = recipes => {
  return (
    recipes?.map(recipe => {
      const {
        idMeal,
        strMeal,
        strCategory,
        strArea,
        strTags,
        strInstructions,
        strMealThumb,
      } = recipe;
      return {
        id: idMeal,
        title: strMeal,
        category: strCategory,
        cuisine: strArea,
        tags: strTags,
        instructions: strInstructions,
        image: strMealThumb,
        ingredients: extractIngredients(recipe),
      };
    }) || []
  );
};
