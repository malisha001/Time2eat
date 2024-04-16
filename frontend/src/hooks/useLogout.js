import { useAuthContext } from "./useAuthContext"
import {useAdvertisementsContext} from './useAdvertisementsContext'

export const useLogout = () => {

    const { dispatch } =  useAuthContext()
    const { dispatch: advertisementsDispatch } =  useAdvertisementsContext()

    const logout = () =>{
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        advertisementsDispatch({type: 'SET_ADS', payload: null})
    }

    return {logout}
}