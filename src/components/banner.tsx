import Cta from './cta';

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  primaryColor: string;
  secondaryColor: string;
  children?: React.ReactNode;
};

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: Banner) => {
  const { name, primaryColor, secondaryColor, children } = props;

  return (
    <>
      <div
        className="text-5xl font-bold text-white p-10 flex items-center justify-center flex-row space-x-20 w-full drop-shadow-md"
        style={{ background: primaryColor ? primaryColor : '#000000' }}
      >
        <div className="flex-col space-y-10 text-center">
          <div>{name}</div>
        </div>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4 rounded-lg">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta buttonText="Get Directions" url="http://google.com" color={secondaryColor} />
        </div>
        {children}
      </div>
    </>
  );
};

export default Banner;
