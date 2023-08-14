"use client";

import { Card, Text, Metric, Flex, ProgressBar, Title, Tab, TabGroup, TabList, Grid, TabPanel, TabPanels } from "@tremor/react";
import Chart from "../components/Chart";
import ListTransfer from "../components/ListTransfer";
import { useDataSubgraph, useMonthlyStatsSubgraph } from "@/hooks/useDataSubgraph";

export default function Cards() {
    const { data, error } = useDataSubgraph();

    let loading = true;
    let totalAccountsEver = 0,
        totalOwners = 0,
        numTokens = 0,
        percent = 0;
    if (data && data.dogsInfos[0]) {
        loading = false;
        totalAccountsEver = data.dogsInfos[0].numAccounts;
        totalOwners = data.dogsInfos[0].numOwners;
        numTokens = data.dogsInfos[0].numTokens;

        // calculate percent for the bar
        percent = (totalOwners * 100) / totalAccountsEver;
    }
    return (
        <main className="px-12 py-12">
            <Title>Rekt Dogs NFT Collection | Dashboard</Title>
            <Text>Stats abouts all the transfers</Text>
            <TabGroup className="mt-6">
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Detail</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                            {loading && (
                                <Card className="max-w-sm">
                                    <Text>Loading... </Text>
                                </Card>
                            )}
                            {!loading && (
                                <>
                                    <Card className="max-w-sm">
                                        <Text>NFT Owners</Text>
                                        <Metric>{totalOwners}</Metric>
                                        <Flex className="mt-4">
                                            <Text>{percent.toFixed(1)}% over the maximum during the entire project</Text>
                                        </Flex>
                                        <ProgressBar value={Math.floor(percent)} className="mt-2" />
                                    </Card>
                                    <Card className="max-w-sm">
                                        <Text>Total Accounts </Text>
                                        <Metric>{totalAccountsEver}</Metric>
                                    </Card>
                                    <Card className="max-w-sm">
                                        <Text>Total NFT in the collection </Text>
                                        <Metric>{numTokens}</Metric>
                                    </Card>
                                </>
                            )}
                        </Grid>

                        <div className="mt-6">
                            <Card>
                                <Chart />
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <ListTransfer />
                            </Card>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    );
}
