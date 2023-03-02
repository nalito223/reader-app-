import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import SearchAppBar from "./SearchAppBar"
import Tabs from "./Tabs"
import Card from "./Card"
import ArticleDetailView from "./ArticleDetailView"
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
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | any>(null);


  useEffect(() => {
    const apiKey = "y91isREinSgzhbg3K1rq92arrgbiLfkw";
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        // const articlesData = data.results.map((result: any) => ({
        //   title: result.title,
        //   url: result.url
        // }));

        const uniqueSections = data.results.reduce((acc: [], curr: Article) => {
          // @ts-ignore
          !acc.includes(curr.section) && acc.push(curr.section)
          return acc
        }, [])
        setSections(["all", ...uniqueSections])
        // setArticles(articlesData);
        setArticles(data.results);
      });
  }, []);

  function updateDisplayedArticles(selectedSection: string, articles: Article[], searchInput: string) {
    let filteredArticles = articles;

    // if (selectedSection !== 'all' ) {
    //   filteredArticles = filteredArticles.filter(article => article.section === selectedSection);
    // }

    if (selectedSection !== 'all' ) {
      filteredArticles = filteredArticles.filter(article => article.section === selectedSection);
    }

    if (searchInput.trim() !== '') {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchInput.toLowerCase())
        || article.abstract.toLowerCase().includes(searchInput.toLowerCase())
        || (article.byline && article.byline.toLowerCase().includes(searchInput.toLowerCase()))
      );
    }

    return filteredArticles;
  }

  return (
    <>
      <SearchAppBar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <div className="tablist-container" style={{ height: "50px", overflowX: "scroll" }}>
     
          <Tabs
          sections={sections}
          setSelectedSection={setSelectedSection}
        />
      </div>

      <div className="app-container">

        <Routes>
          <Route path="/" element={
            <>
              <h1>{headline}</h1>

              {updateDisplayedArticles(selectedSection, articles, searchInput).length === 0 &&
                searchInput
                ?
                <h3 style={{ textAlign: "center" }}>No search results...</h3>
                :
                null
              }

              <div className="cards-container">
                {updateDisplayedArticles(selectedSection, articles, searchInput).map(article => (
                  <Card
                    article={article}
                    key={article.url}
                    setSelectedArticle={setSelectedArticle} />
                ))}
              </div>

            </>
          } />

          {selectedArticle && selectedArticle.title && (
            <Route
              path={`/article/${selectedArticle.title.toLowerCase().split(" ").join("-")}`}
              element={<ArticleDetailView article={selectedArticle} />}
            />
          )}

        </Routes>

      </div>
    </>
  );
}

export default App;
