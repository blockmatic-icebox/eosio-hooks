import { GetTableRowsMessageData } from '@dfuse/client';
export default function useDfuseTableStream<State>({ code, scope, table, lower_bound, upper_bound }: GetTableRowsMessageData): {
    state: any;
    subscribe: () => Promise<void>;
    unsubscribe: () => Promise<void> | undefined;
};
