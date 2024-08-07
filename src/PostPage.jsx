import React, { useState, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toPng } from "html-to-image";
import "./PostPage.css";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const postRef = useRef(null);

  const handleGenerateOgImage = () => {
    toPng(postRef.current)
      .then((dataUrl) => {
        setOgImageUrl(dataUrl);
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  return (
    <HelmetProvider>
      <div className="post-page">
        <Helmet>
          {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        </Helmet>
        <h1 className="post-heading">
          Assignment: Dynamic Post Page with OG Image Generation
        </h1>
        <div className="post-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button onClick={handleGenerateOgImage}>Generate OG Image</button>
        </div>
        <div className="post-preview" ref={postRef}>
          <h2>{title}</h2>
          <p>{content}</p>
          {imageUrl && <img src={imageUrl} alt="Post" />}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default PostPage;
