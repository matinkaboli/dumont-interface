import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
