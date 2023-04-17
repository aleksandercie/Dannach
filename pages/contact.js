import React from "react";
import ContactBox from "../components/ContactBox/ContactBox";
import Layout from "../components/Layout/Layout";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function Contact({ contact, footer, navigation }) {
  return (
    <Layout footer={footer} navigation={navigation}>
      <ContactBox contact={contact} />
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
            logoCollection {
              items{
                logo
              }
            }
            contactCollection {
                items {
                  sales
                  press
                  info
                  phone
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
  const contact = data.contactCollection.items[0];
  const footer = data.footerCollection.items[0];
  const navigation = data.navigationCollection.items[0];

  return {
    props: {
      contact,
      footer,
      navigation,
    },
  };
};
