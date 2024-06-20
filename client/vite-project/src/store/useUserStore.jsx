import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(persist(
    (set, get) => (
        {
            token: null,
            current: null,
            abc: 'abc'
        }
    ),
    {
        name: 'rest_state1',
        storage: createJSONStorage(() => localStorage),
        // return an object of state to save
        partialize: (state) => 
            Object.fromEntries(Object.entries(state).filter((el) => (el[0] === 'token' || el[0] === 'current'))),
    }
))