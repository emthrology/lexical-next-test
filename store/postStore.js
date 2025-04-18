import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const usePostStore = create(
  devtools((set) => ({
    isPostContentUpdated: false,
    resetUpdateFlag: () => set({ isPostContentUpdated: false }),
    postId: '',
    setPostId: (postId) => set({ postId }),
    clearPostId: () => set({ postId: '' }),

    postTitle: '',
    setPostTitle: (postTitle) => set({ postTitle }),
    clearPostTitle: () => set({ postTitle: '' }),

    postContent: '',
    setPostContent: (postContent) => set({ postContent, isPostContentUpdated: true }),
    clearPostContent: () => set({ postContent: '' }),

    postType: 'free',
    setPostType: (postType) => set({ postType }),
    clearPostType: () => set({ postType: 'free' }),
  }),
    {
      name: 'postStore', // store 이름
    })
);
export default usePostStore;