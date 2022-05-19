import { useEffect } from "react";
import { renderToString } from "react-dom/server";
import Banner from "../components/banner";
import Contact from "../components/contact";
import Information from "../components/information";
import Footer from "../components/footer";
import Header from "../components/header";
import Hours from "../components/hours";
import About from "../components/about";
import PhotoGallery from "../components/photo-gallery";
import { SchemaWrapper } from "../components/schema/jsonld";
import StaticMap from "../components/static-map";
import "../index.css";
import { reactWrapper } from "../wrapper";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const config = {
  name: 'about-us',
  hydrate: true,
  streamId: 'about-us',
  stream: {
    $id: 'about-us',
    source: 'knowledgeGraph',
    destination: 'pages',
    fields: [
        'id',
        'uid',
        'meta',
        'name',
        'richTextDescription',
        'photoGallery',
        'slug'
    ],
    filter: {
      entityTypes: ['ce_aboutUsPage'],
    },
    localization: {
      locales: ['en'],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `about`;
};

const AboutUs = (props: any) => {
  const { document } = props;
  const { streamOutput } = document;
  const { 
      _site, 
      name, 
      richTextDescription, 
      photoGallery, 
      slug 
    } = streamOutput;

  return (
    <>
      <body className="font-main">
        <div className="centered-container">
            <Header
                name={_site.name}
                header={_site.c_header}
                relatedPages={_site.c_relatedPages}
                primaryColor={_site.c_primaryColor}
                secondaryColor={_site.c_secondaryColor}
                font={_site.c_font}
                googleAnalytics={_site.c_googleAnalytics}
                logo={_site.logo}
            ></Header>
        </div>
        <div className="w-full">
            <Banner 
                name="About Us"
                secondaryColor="blue"
                photo={photoGallery[0].image.url}
            ></Banner>
        </div>
            <div className="centered-container">
                <div className="section px-10 grid grid-cols-2 gap-x-10">
                    {photoGallery && (
                        <div>
                            <LazyLoadImage
                                height={photoGallery[1].image.height}
                                src={photoGallery[1].image.url} // use normal <img> attributes as props
                                width={photoGallery[1].image.width} className=""/>
                        </div>    
                    )}
                    {richTextDescription && (<div>{richTextDescription}</div>)}
                </div>
                {photoGallery && (<PhotoGallery photoGallery={photoGallery.slice(2)}></PhotoGallery>)}
            </div>
        <Footer footer={_site.c_footer}></Footer>
      </body>
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(
    data,
    'about',
    'about-us.tsx',
    renderToString(<AboutUs data={data} />),
    config.hydrate
  );

export default AboutUs;
