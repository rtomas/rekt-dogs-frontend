import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

// interfaces for the data received from the subgraph
interface ResponseGeneral {
    dogsInfos: { numTokens: number; numOwners: number; numAccounts: number }[];
}

interface ResponseMonthly {
    monthlySnapshots: { id: number; monthlyTransfersCount: number; numOwners: number }[];
}

interface TransferList {
    transactions: { from: { address: string }; to: { address: string }; block: { timestamp: number; number: number } }[];
}

// queries to the subgraph
const GENERAL_STATS_QUERY = gql`
    query {
        dogsInfos(first: 1) {
            numTokens
            numOwners
            numAccounts
        }
    }
`;

const MONTHLY_STATS_QUERY = gql`
    query {
        monthlySnapshots(orderDirection: asc, orderBy: id) {
            id
            numOwners
            monthlyTransfersCount
        }
    }
`;

const TRANSFER_QUERY = gql`
    query Transfers($first: Int!, $skip: Int!) {
        transactions(first: $first, skip: $skip, orderBy: block__timestamp, orderDirection: desc) {
            to {
                address
            }
            from {
                address
            }
            block {
                timestamp
                number
            }
        }
    }
`;

const useDataSubgraph = () => {
    const { data, error } = useSuspenseQuery<ResponseGeneral>(GENERAL_STATS_QUERY);
    return { data, error };
};

const useMonthlyStatsSubgraph = () => {
    const { data, error } = useSuspenseQuery<ResponseMonthly>(MONTHLY_STATS_QUERY);

    return { data, error };
};

const useListTransfer = () => {
    const { data, error } = useSuspenseQuery<TransferList>(TRANSFER_QUERY, { variables: { first: 50, skip: 0 } });

    return { data, error };
};

export { useDataSubgraph, useMonthlyStatsSubgraph, useListTransfer };
