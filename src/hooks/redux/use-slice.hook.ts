import {TypedUseSelectorHook, useSelector} from "react-redux";
import { RootState } from '../../store/store.ts';

export const useSlice: TypedUseSelectorHook<RootState> = useSelector;