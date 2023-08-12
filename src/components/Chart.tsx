"use client";

import { useMonthlyStatsSubgraph } from "@/hooks";
import { Card, AreaChart, Title, Text } from "@tremor/react";
import { fromUnixTime, format } from "date-fns";

export default function Chart() {
    const { data, error } = useMonthlyStatsSubgraph();
    let loading = true;

    if (data) {
        loading = false;
        let data_array: any[] = [];
        data.monthlySnapshots.forEach((item, index) => {
            let date = fromUnixTime(item.id);

            let val = {
                id: index,
                date: date.toLocaleString("en-US", { month: "long" }) + " - " + date.getFullYear(),
                year: date.getFullYear(),
                month: date.getMonth(),
                monthlyTransfers: item.monthlyTransfersCount,
                amountOfOwners: item.numOwners,
            };

            data_array.push(val);
        });

        return (
            <Card className="mt-8">
                <Title>Performance</Title>
                <Text>Comparison between Sales and Profit</Text>
                <AreaChart
                    className="mt-4 h-80"
                    data={data_array}
                    categories={["amountOfOwners", "monthlyTransfers"]}
                    index="date"
                    colors={["indigo", "fuchsia"]}
                    yAxisWidth={60}
                />
            </Card>
        );
    }
}
