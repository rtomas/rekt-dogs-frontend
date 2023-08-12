"use client";

import { useListTransfer } from "@/hooks";
import { Title, Flex, Table, TableBody, TableCell, BadgeDelta, TableRow, TableHeaderCell, TableHead } from "@tremor/react";
import { fromUnixTime } from "date-fns";

/// create the list of transfers
export default function ListTransfer() {
    const { data, error } = useListTransfer();
    let loading = true;

    if (data) {
        return (
            <>
                <div>
                    <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                        <Title> Last 50 Transfers </Title>
                    </Flex>
                </div>
                <Table className="mt-6">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Date</TableHeaderCell>
                            <TableHeaderCell>From</TableHeaderCell>
                            <TableHeaderCell>To</TableHeaderCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data &&
                            data.transactions.map((item, index) => {
                                // unix to date format
                                let date = fromUnixTime(item.block.timestamp);
                                let date_str = date.toLocaleString("en-US", { month: "long" }) + " " + date.getDay() + ", " + date.getFullYear();
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{date_str}</TableCell>
                                        <TableCell>{item.from.address}</TableCell>
                                        <TableCell>{item.to.address}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </>
        );
    }
}
