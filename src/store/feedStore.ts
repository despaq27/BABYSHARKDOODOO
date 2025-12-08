import { create } from 'zustand';

interface FeedState {
    currentIndex: number;
    wishlist: string[];
    cart: string[];
    isMuted: boolean;

    setCurrentIndex: (index: number) => void;
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    addToCart: (id: string) => void;
    toggleMute: () => void;
}

export const useFeedStore = create<FeedState>((set) => ({
    currentIndex: 0,
    wishlist: [],
    cart: [],
    isMuted: true,

    setCurrentIndex: (index) => set({ currentIndex: index }),

    addToWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter(item => item !== id)
            : [...state.wishlist, id]
    })),

    removeFromWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.filter(item => item !== id)
    })),

    addToCart: (id) => set((state) => ({
        cart: [...state.cart, id]
    })),

    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
