import type React from "react";


export type ProfileData = {
  _id: string
  email: string
  emailVerified?: boolean
  language?: string
  currency?: string
  hasFinishedQuiz?: boolean
  providers?: {}[]
  photos: any,
  name: string
  firstName: string
  lastName: string
}


export interface AppContextType {
  profile: ProfileData
  setProfile: React.Dispatch<React.SetStateAction<AppContextType['profile']>>,

}
