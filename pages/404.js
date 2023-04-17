import React from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function Notfound({ notfound, footer, navigation }) {
  const { button, title } = notfound;

  return (
    <Layout footer={footer} navigation={navigation}>
      <div className="text-5xl mt-52 mb-60 mx-auto w-64 text-center">
        <p className="mb-8">{title}</p>
        <Link
          href="/"
          className="text-3xl px-4 py-2 bg-black text-white hover:text-black hover:bg-white transition-all duration-200"
        >
          {button}
        </Link>
      </div>
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
          notFoundCollection {
            items {
              title
              button
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
  const notfound = data.notFoundCollection.items[0];
  const footer = data.footerCollection.items[0];
  const navigation = data.navigationCollection.items[0];

  return {
    props: {
      notfound,
      footer,
      navigation,
    },
  };
};
