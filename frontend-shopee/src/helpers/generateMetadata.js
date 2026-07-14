import { Helmet } from "react-helmet-async";

export default function generateMetadata({ data }) {
  return (
    <Helmet>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description} />
      <meta name="keywords" content={data?.keywords} />
      <meta property="og:title" content={data?.ogTitle} />
      <meta property="og:description" content={data?.ogDescription} />
      <meta property="og:image" content={data?.ogImage} />
      <meta property="og:url" content={data?.ogUrl} />
      <meta property="og:type" content={data?.ogType} />
    </Helmet>
  );
}
