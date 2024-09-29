import React, { useEffect, useState } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css"; // Import the KaTeX CSS for styling

interface ContentProps {
  content: string;
}

const MarkdownReader = ({ content }: ContentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return <Latex>{content}</Latex>;
};

export default MarkdownReader;
