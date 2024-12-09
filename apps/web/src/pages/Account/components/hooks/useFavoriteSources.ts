import React, {useEffect, useState} from 'react';
import useSharedHook from "../../../../hooks/useSharedHook.js";

type FavoriteSourcesType = string[]
const _useFavoriteSources = (): {
    favoriteSources: FavoriteSourcesType
    addFavoriteSource: (slug: string) => void
    removeFavoriteSources: (slug: string) => void
} => {
    const [favoriteSources, setFavoriteSources] = useState<FavoriteSourcesType>(JSON.parse(localStorage.getItem('favoriteSource') || '[]'));

    const addFavoriteSource = (slug: string) => {
        if (favoriteSources.includes(slug)) {
            return
        }
        setFavoriteSources(favoriteSourcesPrev => [...favoriteSourcesPrev, slug]);
    }
    useEffect(() => {
        localStorage.setItem('favoriteSource', JSON.stringify(favoriteSources))
    }, [favoriteSources]);
    const removeFavoriteSources = (slug: string) => {
        const filteredFavoriteSources = favoriteSources.filter(item => item !== slug);
        setFavoriteSources(filteredFavoriteSources)
    }
    return {
        favoriteSources,
        addFavoriteSource,
        removeFavoriteSources
    };
};

export const useFavoriteSources = () => useSharedHook<ReturnType<typeof _useFavoriteSources>>(_useFavoriteSources);
