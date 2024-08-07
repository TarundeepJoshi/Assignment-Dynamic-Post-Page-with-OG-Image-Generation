# Dynamic Post Page with OG Image Generation

## Overview
This project involves creating a static post page using React that dynamically generates an Open Graph (OG) image based on the post content. The OG image includes the post title, a snippet of the content, and any associated image, replicating the design of the post itself.

## Features
- **Post Creation**: Input fields for the title, content, and optional image URL.
- **OG Image Generation**: Generate a dynamic OG image based on the post content.
- **Meta Tags**: Automatically updates OG meta tags for sharing on social media.
- **Responsive Design**: Styled to be visually appealing and user-friendly.

## Components

### `PostPage.jsx`
The main component that includes:
- **State Variables**:
  - `title`: Stores the title of the post.
  - `content`: Stores the content of the post.
  - `imageUrl`: Stores the URL of any associated image.
  - `ogImageUrl`: Stores the URL of the dynamically generated OG image.
  
- **Functions**:
  - `handleGenerateOgImage()`: Uses `html-to-image` to generate the OG image and updates `ogImageUrl`.

- **Rendered Elements**:
  - Form for title, content, and image URL.
  - Button to generate the OG image.
  - Preview section with the post title, content, and associated image.
  - OG meta tags for the generated image.

### `PostPage.css`
CSS styles for the `PostPage` component:
- Ensures form elements are responsive and contained within their container.
- Styles the OG image preview and form elements for a clean look.
- Centers the heading and form.

## How It Works

1. **User Input**:
   - The user enters the post title, content, and optionally an image URL into the form.

2. **Generating the OG Image**:
   - Clicking the "Generate OG Image" button triggers the `handleGenerateOgImage` function.
   - The `html-to-image` library converts the `post-preview` div into a PNG image.
   - The resulting image data URL is stored in `ogImageUrl`.

3. **Updating OG Meta Tags**:
   - The `Helmet` component updates the OG meta tag with the new image URL.

4. **Styling and Layout**:
   - CSS ensures elements are centered and visually appealing.
   - `box-sizing: border-box` is used to include padding and borders in element dimensions.

## Source Code

### `PostPage.jsx`
```jsx
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
          {ogImageUrl && (
            <meta
              property="og:image"
              title={title}
              aria-description={content}
              content={ogImageUrl}
            />
          )}
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
```

### `PostPage.css`
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.post-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

h1 {
  justify-content: center;
  text-align: center;
}

.post-heading {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}

.post-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.post-form input,
.post-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.post-form button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-form button:hover {
  background-color: #0056b3;
}

.post-preview {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.post-preview h1 {
  margin-top: 0;
  font-size: 24px;
}

.post-preview p {
  font-size: 18px;
}

.post-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 10px;
}
```

## Performance Considerations
- The `html-to-image` library is used for image generation, optimized for speed.
- The form and preview sections are styled for responsiveness and efficiency.

## Installation and Usage

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TarundeepJoshi/Assignment-Dynamic-Post-Page-with-OG-Image-Generation
   cd your-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Your Browser**:
   Navigate to `http://localhost:3000` to view and interact with the post page.

## Contributing
Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

## License
This project is licensed under the MIT License.

---

Feel free to replace placeholders with actual details for your project, such as repository URL or license type.
