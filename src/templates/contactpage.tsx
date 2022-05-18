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
  name: "contactpage",
  hydrate: true,
  streamId: "contactpage",
  stream: {
    $id: "contactpage",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_relatedLocation.name",
      "c_relatedLocation.address",
      "c_relatedLocation.hours",
      "c_relatedLocation.mainPhone",
      "c_relatedLocation.emails",
      "richTextDescription",
      "photoGallery",
      "slug"
    ],
    filter: {
      entityTypes: ["ce_contactUsPage"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `contact`;
};

const ContactPage = (props: any) => {
    const { document } = props;
    const { streamOutput } = document;
    const { 
        _site, 
        name, 
        richTextDescription, 
        photoGallery, 
        c_relatedLocation, 
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
                    <Contact address={c_relatedLocation[0].address} mainphone={c_relatedLocation[0].mainPhone} hours={c_relatedLocation[0].hours}></Contact>
                </div>
            <Footer footer={_site.c_footer}></Footer>
          </body>
        </>
      );
    };

export const render = (data: any) =>
  reactWrapper(
    data,
    "contactpage",
    "contactpage.tsx",
    renderToString(<ContactPage data={data} />),
    config.hydrate
  );

export default ContactPage;
