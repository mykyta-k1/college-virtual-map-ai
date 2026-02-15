/**
 * Meta tag information extracted from AI response
 */
export interface MetaTag {
  label: string;
}

/**
 * Parsed AI response with optional meta tag
 */
export interface ParsedAiResponse {
  content: string;
  metaTag: MetaTag | null;
}

/**
 * Utility to parse AI response and extract meta tags
 * Meta tags are in format: <meta label="search text" />
 */
export function parseAiResponse(response: string): ParsedAiResponse {
  // Regex to match <meta label="..." /> at the end of the response
  const metaTagRegex = /<meta\s+label="([^"]+)"\s*\/>\s*$/i;
  const match = response.match(metaTagRegex);

  if (match) {
    // Extract the label value
    const label = match[1];

    // Remove the meta tag from the content
    const content = response.replace(metaTagRegex, '').trim();

    return {
      content,
      metaTag: { label },
    };
  }

  // No meta tag found
  return {
    content: response,
    metaTag: null,
  };
}
