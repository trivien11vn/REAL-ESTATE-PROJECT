import { create } from 'zustand'

export const useAppStore = create(() => (
    {
        isShowModal: false,
        contentModal: null
    }
))