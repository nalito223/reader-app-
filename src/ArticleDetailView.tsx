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
}

interface ArticleDetailViewProps {
  article: Article;
}

function ArticleDetailView({ article }: ArticleDetailViewProps): JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const hasImage = article.multimedia && article.multimedia.length > 0 && article.multimedia[0].type === 'image';

  return (
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
  );
}

export default ArticleDetailView;
