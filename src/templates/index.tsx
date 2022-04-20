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
  streamId: 'products',
  stream: {
    $id: 'products',
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
      'c_richTextDescription',
      'hours',
      'photoGallery',
      'slug',
      'geocodedCoordinate',
      'services',
      'neighborhood',
      'paymentOptions',
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
  return `index/${data.document.streamOutput.uid.toString()}`;
};

const Index = ({ data }: { data: any }) => {
  const { document } = data;
  const { streamOutput } = document;
  const { name, address, description, openTime, hours, mainPhone, _site, geocodedCoordinate, services, photoGallery } =
    streamOutput;

  return (
    <>
      <div className="centered-container">
        <Header site={_site}></Header>
      </div>
      <Banner name={name} address={address} openTime={openTime} color={_site.c_primaryColor}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4 rounded-lg">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta buttonText="Get Directions" url="http://google.com" style="primary-cta" />
        </div>
      </Banner>
      <div className="centered-container">
        <div className="section text-center grid gap-y-5">
          <h2 className="text-4xl">About Us</h2>
          <p>{description}</p>
        </div>
        <div className="section p-8 grid gap-y-5 bg-gray-100">
          <h2 className="text-4xl text-center">Contact</h2>
          <div className="grid grid-cols-2">
            <div>
              <h3 className="text-3xl">Information</h3>
              <Contact address={address} phone={mainPhone}></Contact>
            </div>
            <div>
              <h3 className="text-3xl">Opening Hours</h3>
              <div>{hours && <Hours title={''} hours={hours} />}</div>
            </div>
          </div>
        </div>
        <div className="section">
            <StaticMap latitude={geocodedCoordinate.latitude} longitude={geocodedCoordinate.longitude}></StaticMap>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'index', 'index.tsx', renderToString(<Index data={data} />), config.hydrate);

export default Index;
