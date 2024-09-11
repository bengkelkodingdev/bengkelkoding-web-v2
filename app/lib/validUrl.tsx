import Link from "next/link";

function splitTextByURL(text: string): JSX.Element[] {
  const urlPattern = new RegExp(/(https?:\/\/[^\s]+)/gi);

  // Split text based on the URL pattern
  const parts: string[] = text.split(urlPattern);
  const matches: string[] = text.match(urlPattern) || [];

  // Use map to iterate over the parts and decide if each part is a URL or text
  return parts.map((part, index) =>
    matches.includes(part) ? (
      <Link key={index} href={part} target="_blank" className="text-primary2">
        {part}
      </Link>
    ) : (
      <span key={index} className="text-neutral2">
        {part}
      </span>
    )
  );
}

export default splitTextByURL;
