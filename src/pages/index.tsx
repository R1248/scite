import { useSession } from "next-auth/react";
import Head from "next/head";
import StockSidebar from "~/components/left_panel/stockSidebar";
import Headbar from "~/components/headbar";
import NewsSidebar from "~/components/right_panel/newsSidebar";
import Graph from "~/components/main_panel/graph";
import ControlPanel from "~/components/main_panel/controlPanel";
import { useState } from "react";
import Portfolio from "~/components/main_panel/portfolio";
import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();
  const [displayPortfolio, setDisplayPortfolio] = useState(false);
  const [graphData, setGraphData] = useState<string>("Apple");
  const { data: stock } = api.stock.one.useQuery({ name: graphData });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen min-h-full w-screen min-w-full flex-col">
        <Headbar />
        <div className="flex h-full flex-row">
          <StockSidebar setGraphData={setGraphData} />
          <div className="relative flex w-full flex-col overflow-hidden">
            {displayPortfolio ? (
              <Portfolio setDisplayPortfolio={setDisplayPortfolio} />
            ) : (
              <>
                <Graph />
                <ControlPanel setDisplayPortfolio={setDisplayPortfolio} />
              </>
            )}
          </div>
          <NewsSidebar />
          {sessionData ? <></> : <></>}
        </div>
      </main>
    </>
  );
}
