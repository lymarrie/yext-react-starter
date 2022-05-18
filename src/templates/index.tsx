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
  name: "index",
  hydrate: true,
  streamId: "locations",
  stream: {
    $id: "locations",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "description",
      "hours",
      "mainPhone",
      "geocodedCoordinate",
      "services",
      "logo",
      "photoGallery",
      "c_displayPhotoGallery",
      "c_displayStaticMap",
      "c_primaryColor",
      "c_secondaryColor",
      "c_font",
      "c_header",
      "c_footer",
      "c_googleAnalytics",
      "c_metaDescription",
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `index.html`;
};

const Index = (props: any) => {
  const { document } = props;
  const { streamOutput } = document;
  const {
    _site,
    name,
    address,
    description,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    logo,
    photoGallery,
    c_displayPhotoGallery,
    c_displayStaticMap,
    c_primaryColor,
    c_secondaryColor,
    c_font,
    c_header,
    c_footer,
    c_googleAnalytics,
    c_metaDescription,
  } = streamOutput;


  return (
    <>
      <body className="font-main">
        <div className="centered-container">
          <Header
            name={name}
            header={c_header}
            relatedPages={_site.c_relatedPages}
            primaryColor={c_primaryColor}
            secondaryColor={c_secondaryColor}
            font={c_font}
            googleAnalytics={c_googleAnalytics}
            logo={logo}
          ></Header>
        </div>
        <Banner 
          name={name}
          secondaryColor="blue"
          photo={photoGallery[0].image.url}
          position="bg-center"
        ></Banner>

        <About description={description}></About>
        <div className="w-full bg-gray-200">
          <div className="centered-container">
            <Contact
              address={address}
              mainPhone={mainPhone}
              hours={hours}
            ></Contact>
            {c_displayPhotoGallery && (
              <PhotoGallery photoGallery={photoGallery.slice(1, -1)}></PhotoGallery>
            )}
            {c_displayStaticMap && (
              <StaticMap
                latitude={geocodedCoordinate.latitude}
                longitude={geocodedCoordinate.longitude}
              ></StaticMap>
            )}
          </div>
        </div>
        <Footer footer={c_footer}></Footer>
      </body>
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(
    data,
    "index",
    "index.tsx",
    renderToString(<Index data={data} />),
    config.hydrate,
  );

export default Index;
