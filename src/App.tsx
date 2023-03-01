import React, { useState, useEffect } from "react";
import "./App.css"
import SearchAppBar from "./SearchAppBar"
import Tabs from "./Tabs"
import Card from "./Card"
// import Drawer from "./Drawer"

interface Article {
  section: string;
  subsection?: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker?: string;
  des_facet?: string[];
  org_facet?: string[];
  per_facet?: string[];
  geo_facet?: string[];
  multimedia: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }[];
  short_url: string;
}


// let drawerOpen = false

function App(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sections, setSections] = useState<Article[]>([]);
  const [headline, setHeadline] = useState('Top stories');

  useEffect(() => {
    const apiKey = "y91isREinSgzhbg3K1rq92arrgbiLfkw";
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        const articlesData = data.results.map((result: any) => ({
          title: result.title,
          url: result.url
        }));

        const uniqueSections = data.results.reduce((acc: [], curr: Article) => {
          // @ts-ignore
          !acc.includes(curr.section) && acc.push(curr.section)
          return acc
        }, [])
        setSections(["All", ...uniqueSections])
        // setArticles(articlesData);
        setArticles(data.results);
      });
  }, []);

  return (
    <div className="app-container">
      <SearchAppBar />
      <Tabs sections={sections} />
      <h1>{headline}</h1>
      <div className="cards-container">
        {/* <ul> */}
          {articles.map((article) => (
           <Card article={article} />
            // <li key={article.url}>
            //   <a href={article.url}>{article.title}</a>
            // </li>
          ))}
        {/* </ul> */}
      </div>
    </div>
  );
}

export default App;
