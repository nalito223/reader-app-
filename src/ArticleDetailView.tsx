import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ArticleDetailView.css"

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
  index: number;
  url1: string;
}

// interface ArticleDetailViewProps {
//   article: Article;
// }

function ArticleDetailView({  }): JSX.Element {
  const [article, setArticle] = useState<Article | any>({});
  const { id } = useParams<{ id: string }>();
  // const url1 = Object.values(useParams())[0]
  const currentUrl = window.location.href;
const url1 = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

const apiKey = "y91isREinSgzhbg3K1rq92arrgbiLfkw";
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

  // console.log(Object.values(useParams())[0])
// console.log("URI from params", Object.values(id))


  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    console.log("made it to article detail view")
    window.scrollTo(0, 0);
    const apiKey = "y91isREinSgzhbg3K1rq92arrgbiLfkw";
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("FETCH IN DETAIL",data.results)
    //     let articleMatch
    //     const findMatch = data.results.forEach((article: Article) => {
    //       if (url1 && article.url.includes(url1)) {
    //         articleMatch = article
    //       } else {
    //         console.log("NO MATCH FOUND")
    //       }
    //     })

    fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let articleMatch;
    data.results.forEach((article: Article) => {
      if (article.url.includes(url1)) {
        articleMatch = article;
      }
    });
    setArticle(articleMatch);
  });
  }, []);
  
  const hasImage = article?.multimedia && article.multimedia.length > 0 && article.multimedia[0].type === 'image';

  return (
    article && article.title && (
    <div className="detail-view-container">
      <h2 className="detail-title">{article.title}</h2>
      <p className="detail-abstract">{article.abstract}</p>

      <div className="detail-byline-container">
        <p>{article.byline} | {article.published_date}</p>
      </div>

      {hasImage && (
        <img src={article.multimedia[0].url} alt={article.multimedia[0].caption} />
      )}
      
      {hasImage && (
        <p>{article.multimedia[0].caption}<i> Credit: {article.multimedia[0].copyright}</i></p>
      )}
        
      <Link to={article.url}>
        <p className="nyt-link"><mark>Click to continue reading at the New York Times.</mark></p>
      </Link>
    </div>
  ))
};


export default ArticleDetailView;
