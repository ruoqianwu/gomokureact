import {createContext} from 'react'

// player who joins game first play black

export const ColorContext = createContext({
    didRedirect: false,
    playerDidRedirect: ()=>{},
    playerDidNotRedirect: ()=>{}
})