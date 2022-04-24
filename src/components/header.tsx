import Cta from '../components/cta';

type Link = {
  label: string;
  uRL: string;
};

type Image = {
  url: string;
}

type Logo = {
  height?: number;
  width?: number;
  image: Image;
}

type SiteAttributes = {
  name: string;
  logo: Logo;
  c_header: Array<Link>;
}

type Site = {
  site: SiteAttributes;
}



const Header = (props: Site) => {
  const { site } = props;
  // console.log(site.c_header);
  const headerLinks = site.c_header.map((link) => (
    <div>
      <a key="uRL" href={link.uRL} className="hover:underline">
        {link.label}
      </a>
    </div>
  ));
  return (
    <>
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <img src={site.logo.image.url} width="120" height="120"></img>
          <div className="text-2xl font-semibold">{site.name}</div>
          <div className="flex gap-x-10 text-lg font-semibold">{headerLinks}</div>
          {/* <div className="space-x-5">
            <Cta buttonText="Order Pickup" url="#" style="primary-cta"></Cta>
            <Cta buttonText="Order Delivery" url="#" style="secondary-cta"></Cta>
          </div> */}
        </nav>
      </div>
    </>
  );
};

export default Header;
