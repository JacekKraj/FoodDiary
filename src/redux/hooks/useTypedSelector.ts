import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { RootState } from './../reducers/index'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
