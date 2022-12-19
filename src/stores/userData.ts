import create from "zustand";
import { MyData } from "../libs/types";

interface UserDataState {
  userData: MyData | null,
  setUserData: (newUserData: MyData) => void
}

const userDataStore = create<UserDataState>()( set => ({
  userData: null,
  setUserData: (newUserData: MyData) => set(() => ({userData: newUserData}))
}))

export default userDataStore