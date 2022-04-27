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

type Header = {
  name: string;
  header: Array<Link>;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  googleAnalytics: Array<Link>;
  logo: Logo;
}


const Header = (props: Header) => {
  const { name, header, primaryColor, secondaryColor, font, googleAnalytics, logo } = props;
  const headerLinks = header.map((link) => (
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
          <img src={logo.image.url} width="120" height="120"></img>
          <div className="text-2xl font-semibold">{name}</div>
          <div className="flex gap-x-10 text-lg font-semibold">{headerLinks}</div>
        </nav>
      </div>
    </>
  );
};

export default Header;
