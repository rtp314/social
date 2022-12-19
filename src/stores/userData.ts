import create from "zustand/react";
import { MyData } from "../libs/types";

interface UserDataState {
  userData: MyData | null,
  setUserData: (newUserData: MyData) => void
}

const userDataStore = create<UserDataState>()( set => ({
  userData: null,
  setUserData: (newUserData: MyData) => set(() => ({userData: newUserData}))
}))

export const myData = userDataStore(state => state.userData)

export const setUserData = userDataStore(state => state.setUserData)