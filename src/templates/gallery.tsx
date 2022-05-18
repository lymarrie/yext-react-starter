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

export const config = {
  name: "gallery",
  hydrate: true,
  streamId: "gallery",
  stream: {
    $id: "gallery",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "richTextDescription",
      "photoGallery",
      "slug"
    ],
    filter: {
      entityTypes: ["ce_photoGalleryPage"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `gallery`;
};

const Gallery = (props: any) => {
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
                {photoGallery && (<Banner 
                    name={name}
                    secondaryColor="blue"
                    photo={photoGallery[0].image.url}
                    position="bg-center"
                ></Banner>)}
            </div>
                <div className="centered-container">
                    {photoGallery && (<PhotoGallery photoGallery={photoGallery.slice(1)}></PhotoGallery>)}
                </div>
            <Footer footer={_site.c_footer}></Footer>
          </body>
        </>
      );
    };

export const render = (data: any) =>
  reactWrapper(
    data,
    "gallery",
    "gallery.tsx",
    renderToString(<Gallery data={data} />),
    config.hydrate
  );

export default Gallery;
