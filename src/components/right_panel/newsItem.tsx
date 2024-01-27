import { type FC, useState } from "react";

type NewsItemProps = {
  news: {
    heading: string;
    text: string;
    category: string;
    company: string;
    mediaCompany: string;
    date: string;
  };
};

const NewsItem: FC<NewsItemProps> = ({ news }) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <button
        className={`static bg-${
          expand === true ? "gray-100" : "white"
        } flex w-full flex-col border-b border-solid border-gray-300 p-1 hover:bg-gray-200`}
        onClick={() => setExpand(!expand)}
      >
        <div className="flex w-full flex-row">
          <div className="mr-1 h-4 w-4 rounded bg-gray-300" />
          <div className="h-4 w-4 rounded bg-gray-300"></div>
          <div className="ml-2 text-xs">{news.date}</div>
        </div>
        <div className="grow text-left text-xs">{news.heading}</div>
      </button>
      {expand ? <ExpandedNewsItem news={news} setExpand={setExpand} /> : <></>}
    </>
  );
};

export default NewsItem;

type ExpandedNewsItemProps = {
  news: {
    heading: string;
    text: string;
    category: string;
    company: string;
    mediaCompany: string;
    date: string;
  };
  setExpand: (expand: boolean) => void;
};

const ExpandedNewsItem: FC<ExpandedNewsItemProps> = ({ news, setExpand }) => {
  return (
    <div
      className="absolute bottom-0 left-64 right-64 top-16 z-20 flex flex-col bg-white p-4"
      onClick={() => setExpand(false)}
    >
      <h1 className="text-2xl">
        {news.company !== "N/A" ? news.company : ""}: {news.heading}
      </h1>
      <div>{news.date}</div>
      <div>{news.mediaCompany}</div>
      <div className="mt-2 text-justify">{news.text}</div>
    </div>
  );
};

export const TailwindBuster = () => {
  return <i className="bg-gray-100"></i>;
};
