import { useState, useEffect } from 'react';

export function useFavourites() {
    const [ids, setIds] = useState(() => new Set(JSON.parse(localStorage.getItem("favs") ?? "[]")));

    // useEffect(() => localStorage.setItem("favs", JSON.stringify([...ids])), [ids]);

    useEffect(() => {
        localStorage.setItem("favs", JSON.stringify([...ids]));
    }, [ids]);

    const toggle = (id) =>
        setIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    
    return { isFavourite: (id) => ids.has(id), toggle };
}
