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
  const [selectedSection, setSelectedSection] = useState('us');
  const [searchInput, setSearchInput] = useState('');

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
        setSections(["all", ...uniqueSections])
        // setArticles(articlesData);
        setArticles(data.results);
      });
  }, []);

  function updateDisplayedArticles(selectedSection: string, articles: Article[], searchInput: string) {
    let filteredArticles = articles;
  
    if (selectedSection !== 'all') {
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
    <div className="app-container">
      <SearchAppBar setSearchInput={setSearchInput} searchInput={searchInput}/>
      <Tabs sections={sections} setSelectedSection={setSelectedSection}/>
      <h1>{headline}</h1>

      {selectedSection !== "all" && <div className="cards-container">
        {updateDisplayedArticles(selectedSection, articles, searchInput).map(article => (
          <Card article={article} />
        ))}
      </div>}

      {selectedSection === "all" && <div className="cards-container">
        {articles.map((article) => (
          <Card article={article} />
        ))}
      </div>}

    </div>
  );
}

export default App;
