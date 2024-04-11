import { AuthContext } from "../context/AuthContext"
//useContext hook
import { useContext } from "react"

//hook function
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}