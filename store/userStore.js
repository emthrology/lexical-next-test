import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage', // localStorage 키 이름
      }
    ),
    {
      name: 'userStore', // store 이름
    }
  )
);

export default useUserStore