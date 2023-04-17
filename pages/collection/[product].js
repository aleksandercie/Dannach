import React from "react";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import Layout from "../../components/Layout/Layout";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function Product({ product, footer, navigation }) {
  return (
    <Layout footer={footer} navigation={navigation}>
      <ProductDetail product={product} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { product } = params;

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
           query GetProduct($slug: String!) {
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
               productCollection(
                 where:{
                   slug: $slug
                  }, 
                  limit: 1
                  ){
                 items{
                    slug,
                    name,
                    size,
                    color,
                    description,
                    price,
                    image {
                        url
                        title
                        width
                        height
                      }
                 }
               }
              }`,
        variables: {
          slug: product,
        },
      }),
    }
  );
  if (!result.ok) {
    console.error(result);
    return {};
  }
  const { data } = await result.json();
  const productData = data.productCollection.items[0];
  const footer = data.footerCollection.items[0];
  const navigation = data.navigationCollection.items[0];

  return { props: { product: productData, footer, navigation } };
}

export const getStaticPaths = async () => {
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
                productCollection{
                 items {
                  slug
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
  const productsName = data.productCollection.items;

  const paths = productsName.map(({ slug }) => {
    return { params: { product: slug } };
  });

  return {
    paths,
    fallback: false,
  };
};
