import React from "react";
import Products from "../components/Products/Products";
import Layout from "../components/Layout/Layout";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function Collection({ products, footer, navigation }) {
  return (
    <Layout footer={footer} navigation={navigation}>
      <Products products={products} />
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
          productCollection {
            items {
              name
              size
              color
              description
              price
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
  const products = data.productCollection.items;
  const footer = data.footerCollection.items[0];
  const navigation = data.navigationCollection.items[0];

  return {
    props: {
      products,
      footer,
      navigation,
    },
  };
};
