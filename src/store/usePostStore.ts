import { News } from "@/types";
import { create } from "zustand";

interface PostState {
  keyword: string;
  hasTitle: boolean;
  hasContent: boolean;
  hasPublisher: boolean;
  category: string;
  pageSize: number;
  setKeyword: (keyword: string) => void;
  setHasTitle: (hasTitle: boolean) => void;
  setHasContent: (hasContent: boolean) => void;
  setHasPublisher: (hasPublisher: boolean) => void;
  setCategory: (category: string) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;
}

const usePostStore = create<PostState>((set) => ({
  keyword: "",
  hasTitle: false,
  hasContent: false,
  hasPublisher: false,
  category: "",
  pageSize: 20,
  setKeyword: (keyword) => set({ keyword }),
  setHasTitle: (hasTitle) => set({ hasTitle }),
  setHasContent: (hasContent) => set({ hasContent }),
  setHasPublisher: (hasPublisher) => set({ hasPublisher }),
  setCategory: (category) => set({ category }),
  setPageSize: (pageSize) => set({ pageSize }),
  resetFilters: () =>
    set({
      keyword: "",
      hasTitle: false,
      hasContent: false,
      hasPublisher: false,
      category: "",
    }),
}));

interface NewsState {
  newsList: News[];
  page: number;
  hasMore: boolean;
  setNews: (news: News[]) => void;
  appendNews: (news: News[]) => void; // 페이지네이션을 위한 추가
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void; // hasMore 상태 추가
  resetNews: () => void; // 뉴스 목록 초기화
}

const useNewsStore = create<NewsState>((set) => ({
  newsList: [],
  page: 0,
  hasMore: true, // 초기값은 true (데이터가 더 있을 수 있음)
  setNews: (news) => set({ newsList: news }),
  appendNews: (news) =>
    set((state) => ({ newsList: [...state.newsList, ...news] })), // 기존 newsList에 추가
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  resetNews: () => set({ newsList: [], page: 0, hasMore: true }), // 초기화
}));

export { useNewsStore, usePostStore };
