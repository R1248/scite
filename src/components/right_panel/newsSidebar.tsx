import NewsItem from "./newsItem";

const dummyNews = [
  {
    heading: "Q2 earnings beat expectations",
    text: "In the second quarter of 2023, the company reported earnings of $2.37 per share, which beat the analyst consensus estimate of $2.11 by 12.32%. This is a 15.53% increase over earnings of $2.05 per share from the same period last year. The company reported quarterly sales of $19.6 billion, which beat the analyst consensus estimate of $18.24 billion by 7.47%. This is a 34.18% increase over sales of $14.61 billion the same period last year.",
    category: "Technology",
    company: "GOOG",
    mediaCompany: "Scite Investment",
    date: "Today",
  },
  {
    heading: "Unemployment rate falls to 5.4%",
    text: "The unemployment rate fell to 5.4% in July, according to the Bureau of Labor Statistics. The unemployment rate fell by 0.5 percentage points from 5.9% in June. The unemployment rate fell below 6% for the first time since the start of the pandemic. The unemployment rate is down from 10.2% in July 2020.",
    category: "General",
    company: "N/A",
    mediaCompany: "Bloomberg",
    date: "Today",
  },
  {
    heading: "Apple to release new iPhone",
    text: "Apple is set to release a new iPhone in September. The new iPhone will have a 6.1-inch screen and will be available in three colors: black, white, and red. The new iPhone will also have a new camera and a new processor. The new iPhone will be available in three sizes: 5.8-inch, 6.1-inch, and 6.5-inch.",
    category: "Technology",
    company: "AAPL",
    mediaCompany: "Zacks",
    date: "Today",
  },
  {
    heading: "Tesla to release new Model 4",
    text: "Tesla is set to release a new Model 4 in September. Investors feel mainly optimistic and Citigroup bank increased its price expectation from $152 to $162, maintaining the buy rating. The new Model has a promising range of 800 miles, which is 100 miles more than any other EV in the market.",
    category: "Automotive",
    company: "TSLA",
    mediaCompany: "MarketWatch",
    date: "Today",
  },
  {
    heading:
      "The conflict in Gaza escalates as Iran president declares support for Hamas",
    text: "The president of Iran declared at the floor of OSN that Palestine should be freed and Iran will provide millitary aid to the Hamas separatists. Israel responeded by making new contracts with the US corporations to buy more weapons. The conflict is expected to escalate in the coming days.",
    category: "General",
    company: "N/A",
    mediaCompany: "CNN",
    date: "Today",
  },
];

const NewsSidebar = () => {
  return (
    <div className="z-10 h-full w-64 min-w-[256px] border-l border-solid border-black">
      {dummyNews.map((news) => (
        <NewsItem news={news} key={news.heading} />
      ))}
    </div>
  );
};

export default NewsSidebar;
