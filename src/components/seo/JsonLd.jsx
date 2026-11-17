
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(
    /[<>&\u2028\u2029]/g,
    (char) => ({
      "<": "\\u003c",
      ">": "\\u003e",
      "&": "\\u0026",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    })[char]
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
