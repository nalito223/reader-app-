import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import "./Card.css"

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

interface Props {
  article: Article;
  setSelectedArticle: React.Dispatch<React.SetStateAction<Article>>;
  key: string;
}

const Card: React.FC<Props> = ({ article, setSelectedArticle }) => {
  const savedArticle = article;
  const { section, title, abstract, byline, multimedia } = article;
  const imageUrl = multimedia?.find((m) => m.format === 'Super Jumbo')?.url;

  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (multimedia && multimedia.length > 0) {
      let found = false;
      multimedia.forEach((media) => {
        if (!found && media.type === 'image' && media.url) {
          const img = new Image();
          img.src = media.url;
          img.onload = () => {
            found = true;
            setImgSrc(media.url);
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${media.url}`);
          };
        }
      });
    }
  }, [multimedia]);

  return (
    <Link to={`/article/${article.short_url}`}>
      <div className="article-card" onClick={() => setSelectedArticle(savedArticle)}>
        <div className="image-container">
          {imageUrl ? <img src={imageUrl} alt={title} /> : null}
        </div>
        <h4><mark>{"#" + section}</mark></h4>
        <h3>{title}</h3>
        <p>{abstract}</p>
        <p><i>{byline}</i></p>
      </div>
    </Link>
  );
};

export default Card;
