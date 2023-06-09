import dynamic from "next/dynamic";
import Banner from "../components/Banner/Banner";
import Title from "../components/Title/Title";
import Layout from "../components/Layout/Layout";

const Paragraph = dynamic(() => import("../components/Paragraph/Paragraph"));
const Gallery = dynamic(() => import("../components/Gallery/Gallery"));
const Description = dynamic(() =>
  import("../components/Description/Description")
);
const Slider = dynamic(() => import("../components/Slider/Slider"));

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function Home({ homepage, products, footer, navigation }) {
  const { paragraph, banner, slidesCollection, description, button, read } =
    homepage;

  return (
    <Layout footer={footer} navigation={navigation}>
      <Banner src={banner.url} alt={banner.title} />
      <Paragraph paragraph={paragraph} />
      <Slider slides={slidesCollection.items} />
      <Title title={description} />
      <Gallery products={products} />
      <Description button={button} info={read} />
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
          homepageCollection {
            items {
              banner {
                title
                url
              }
              paragraph
              slidesCollection {
                items {
                  title
                  url
                  width
                  height
                }
              }
              description
              button
              read
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
  const homepage = data.homepageCollection.items[0];
  const products = data.productCollection.items;
  const footer = data.footerCollection.items[0];
  const navigation = data.navigationCollection.items[0];

  return {
    props: {
      homepage,
      products,
      footer,
      navigation,
    },
  };
};
