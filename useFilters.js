import { useMemo } from 'react';

export function useFilters(posts, activeTab, filters) {
  const {
    activeCategory, activeRecipeAge, activeRecipeTime,
    activeRemedyAge, activeRemedyTime, activeNutritionAge,
    activeFertilityGender, activeCosmeticsCategory,
    activeMavaziType, activeMavaziGender, activeMavaziOccasion
  } = filters;

  return useMemo(() => {
    return posts.filter(post => {
      if (activeTab === 'feed') {
        if (activeCategory === 'all') return true;
        return post.category === activeCategory;
      }
      if (activeTab === 'recipes') {
        if (activeRecipeAge !== 'all' && post.recipeAge !== activeRecipeAge) return false;
        if (activeRecipeTime !== 'all' && post.recipeTime !== activeRecipeTime) return false;
        return post.category === 'recipe';
      }
      if (activeTab === 'remedies') {
        if (activeRemedyAge !== 'all' && post.remedyAge !== activeRemedyAge) return false;
        if (activeRemedyTime !== 'all' && post.remedyTime !== activeRemedyTime) return false;
        return post.category === 'remedy';
      }
      if (activeTab === 'nutrition') {
        if (activeNutritionAge !== 'all' && post.nutritionAge !== activeNutritionAge) return false;
        return post.category === 'nutrition';
      }
      if (activeTab === 'fertility') {
        if (activeFertilityGender !== 'all' && post.fertilityGender !== activeFertilityGender) return false;
        return post.category === 'fertility';
      }
      if (activeTab === 'tips') return post.category === 'tip';
      if (activeTab === 'modern') return post.category === 'modern';
      if (activeTab === 'cosmetics') {
        if (activeCosmeticsCategory !== 'cos_all' && post.cosmeticsCategory !== activeCosmeticsCategory) return false;
        return post.category === 'cosmetics';
      }
      if (activeTab === 'mavazi') {
        if (activeMavaziType !== 'all' && post.mavaziType !== activeMavaziType) return false;
        if (activeMavaziGender !== 'all' && post.mavaziGender !== activeMavaziGender) return false;
        if (activeMavaziOccasion !== 'all' && post.mavaziOccasion !== activeMavaziOccasion) return false;
        return post.category === 'mavazi';
      }
      if (activeTab === 'saved') return post.saved;
      return true;
    });
  }, [posts, activeTab, filters]);
}