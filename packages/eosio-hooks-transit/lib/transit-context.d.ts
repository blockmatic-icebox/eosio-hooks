import { Dispatch } from 'react';
import { TransitState, TransitReducerActionType, TransitContextType } from './types';
export declare const TransitStateContext: import("react").Context<TransitState | undefined>;
export declare const TransitContext: import("react").Context<TransitContextType | undefined>;
export declare const TransitDispatchContext: import("react").Context<Dispatch<TransitReducerActionType> | undefined>;
