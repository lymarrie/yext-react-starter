import { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import Banner from '../components/banner';
import Contact from '../components/contact';
import Footer from '../components/footer';
import Header from '../components/header';
import Hours from '../components/hours';
import PhotoGallery from '../components/photo-gallery';
import { SchemaWrapper } from '../components/schema/jsonld';
import StaticMap from '../components/static-map';
import '../index.css';
import { reactWrapper } from '../wrapper';

export const config = {
  name: 'index',
  hydrate: true,
  streamId: 'locations',
  stream: {
    $id: 'locations',
    source: 'knowledgeGraph',
    destination: 'pages',
    fields: [
      'id',
      'uid',
      'meta',
      'name',
      'address',
      'description',
      'hours',
      'mainPhone',
      'geocodedCoordinate',
      'services',
      'logo',
      'photoGallery',
      'c_displayPhotoGallery',
      'c_displayStaticMap',
      'c_primaryColor',
      'c_secondaryColor',
      'c_font',
      'c_header',
      'c_footer',
      'c_googleAnalytics',
    ],
    filter: {
      entityTypes: ['location'],
    },
    localization: {
      locales: ['en'],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `index.html`;
};

const Index = ({ data }: { data: any }) => {
  const { streamOutput } = data.document;
  const {
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
  } = streamOutput;

  // Set the css variable `--main-font-family` based on the `c_font` field
  useEffect(() => {
    if (c_font) {
      document?.documentElement.style.setProperty('--main-font-family', c_font);
    }
  }, [c_font]);

  return (
    <>
      <body className="font-main">
        <div className="centered-container">
          <Header
            name={name}
            header={c_header}
            primaryColor={c_primaryColor}
            secondaryColor={c_secondaryColor}
            font={c_font}
            googleAnalytics={c_googleAnalytics}
            logo={logo}
          ></Header>
        </div>

        <Banner name={name} primaryColor={c_primaryColor} secondaryColor={c_secondaryColor}></Banner>
        <div className="centered-container">
          <div className="section text-center grid gap-y-5">
            <h2 className="text-4xl">
              <a id="about">About Us</a>
            </h2>
            <p className="p-10">{description}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200">
          <div className="centered-container">
            <div className="section p-8 grid gap-y-10">
              <h2 className="text-4xl text-center">
                <a id="contact">Contact</a>
              </h2>
              <div className="bg-white p-10 rounded-xl drop-shadow-md">
                <div className="grid grid-cols-2">
                  <div>
                    <h3 className="text-3xl mb-3">Information</h3>
                    <Contact address={address} phone={mainPhone}></Contact>
                  </div>
                  <div>
                    <h3 className="text-3xl">Opening Hours</h3>
                    <div>{hours && <Hours title={''} hours={hours} />}</div>
                  </div>
                </div>
              </div>
            </div>
            {c_displayPhotoGallery && <PhotoGallery photoGallery={photoGallery}></PhotoGallery>}
            {c_displayStaticMap && (
              <StaticMap latitude={geocodedCoordinate.latitude} longitude={geocodedCoordinate.longitude}></StaticMap>
            )}
          </div>
        </div>
        <div className="centered-container">
          <Footer></Footer>
        </div>
      </body>
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'index', 'index.tsx', renderToString(<Index data={data} />), config.hydrate, SchemaWrapper(data));

export default Index;
