import Banner from '../components/banner';
import Header from '../components/header';
import Footer from '../components/footer';
import Cta from '../components/cta';
import Contact from '../components/contact';
import List from '../components/list';
import Hours from '../components/hours';
import StaticMap from '../components/static-map';
import PhotoGallery from '../components/photo-gallery';
import { reactWrapper } from '../wrapper';
import { renderToString } from 'react-dom/server';
import '../index.css';

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
      'mainPhone',
      'description',
      'hours',
      'photoGallery',
      'geocodedCoordinate',
      'slug',
      'paymentOptions',
      'c_displayPhotoGallery',
      'c_displayStaticMap',
      'c_primaryColorSingleSelect',
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
  const { document } = data;
  const { streamOutput } = document;
  const {
    name,
    address,
    description,
    openTime,
    hours,
    mainPhone,
    _site,
    geocodedCoordinate,
    services,
    photoGallery,
    c_displayPhotoGallery,
    c_displayStaticMap,
  } = streamOutput;

  return (
    <>
      <body>
        <div className="centered-container">
          <Header site={_site}></Header>
        </div>
        <Banner name={name} address={address} openTime={openTime} color={_site.c_primaryColorSingleSelect}>
          <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4 rounded-lg">
            <div className="text-black text-base">Visit Us Today!</div>
            <Cta buttonText="Get Directions" url="http://google.com" style="primary-cta" />
          </div>
        </Banner>
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
  reactWrapper(data, 'index', 'index.tsx', renderToString(<Index data={data} />), config.hydrate);

export default Index;
