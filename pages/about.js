import React from "react";
import Image from "next/image";
import Paragraph from "../components/Paragraph/Paragraph";
import Layout from "../components/Layout/Layout";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function About({ about, footer, navigation }) {
  const { main, secondary, info, image } = about;

  const renderParagraph = [main, secondary, info].map((paragraph, index) => (
    <Paragraph key={index} paragraph={paragraph} />
  ));

  return (
    <Layout footer={footer} navigation={navigation}>
      {renderParagraph}
      <Image
        className="max-w-lg mx-auto w-full"
        src={image.url}
        alt={image.title}
        width={image.width}
        height={image.height}
      />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `  
        query {
          footerCollection {
            items {
              logo
              copyrights 
              links
            }
          }
          navigationCollection {
            items
            {
              links 
              title
            }
          }
          aboutCollection {
            items {
              main
              secondary
              info
              image {
                title
                url
                width
                height
              }
            }
          }
          }`,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }
  const { data } = await result.json();
  const about = data.aboutCollection.items[0];
  const footer = data.footerCollection.items[0];
  const navigation = data.navigationCollection.items[0];

  return {
    props: {
      about,
      footer,
      navigation,
    },
  };
};
