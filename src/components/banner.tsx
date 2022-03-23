export type Address = {
  address1: string;
  city: string;
  region: string;
}

type Banner = {
  name?: string;
  address?: Address;
  openTime?: string;
}

const renderPrettyAddress = (name?: string, address?: Address) =>  {
  return (
    <>
      {name && <span>{name}&nbsp;</span>}
      {address && <span>{address.address1} in {address.city}, {address.region}</span>}
    </>
  )
}

const Banner = (props: Banner) => {
  const {
    name,
    address,
    openTime
  } = props;

  return (
    <>
      <div>
        <div>{renderPrettyAddress(name, address)}</div>
        <div>Open Until {openTime}</div>
      </div>
    </>
  );
};
  
export default Banner;