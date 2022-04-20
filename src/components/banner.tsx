export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
  color?: string;
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
  const { name, address, openTime, children, color } = props;

  return (
    <>
      <div className="text-5xl font-bold text-white p-10 flex items-center justify-center flex-row space-x-20 w-full" style={{background: color ? color : '#000000'}}>
        <div className="flex-col space-y-10 text-center">
          <div>{name}</div>
          {/* <div>{renderPrettyAddress(address)}</div> */}
          {/* <div>Open Until {openTime}</div> */}
        </div>
        {children}
      </div>
    </>
  );
};

export default Banner;
