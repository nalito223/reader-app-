import React, { useState, useEffect } from "react";
import "./App.css"
import SearchAppBar from "./SearchAppBar"
import Tabs from "./Tabs"
// import Drawer from "./Drawer"

interface Article {
  title: string;
  url: string;
}


let drawerOpen = false

function App(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sections, setSections] = useState<Article[]>([]);

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

        const uniqueSections = data.results.reduce((acc, curr) => {
          !acc.includes(curr.section) && acc.push(curr.section)
          return acc
        }, [])

        setSections(uniqueSections)

        setArticles(articlesData);
      });
  }, []);

  return (
    <div>
      <SearchAppBar />
      <Tabs sections={sections} />
      <h1>Top Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.url}>
            <a href={article.url}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
