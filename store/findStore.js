import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useFindStore = create(
  devtools((set) => ({
    userId: '테스트아이디',
    setUserId: (userId) => set({ userId }),
    clearUserId: () => set({ userId: '테스트아이디' }),

    findType: 'id',
    setFindType: (findType) => set({ findType }),
    clearFindType: () => set({ findType: 'id' }),

    email: '',
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: '' }),

    phone: '',
    setPhone: (phone) => set({ phone }),
    clearPhone: () => set({ phone: '' }),

    code: '',
    setCode: (code) => set({ code }),
    clearCode: () => set({ code: '' }),

    findSet: [
      {
        id: 'id',
        name: '아이디',
      },
      {
        id: 'pw',
        name: '비밀번호',
      },
    ],
  }),
    {
      name: 'findStore', // store 이름
    })
);

export default useFindStore;