import { Context } from '../main';
import React, { useContext } from 'react'

export default function useLoader() {
    const state = useContext(Context);
    console.log(state)

    function updateLoaderState(fn: (arg0: boolean) => void) {
			return fn(true);
    };

    return {isLoading:state.loader,updateLoaderState }
}
