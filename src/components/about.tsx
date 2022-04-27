const About = (props) => {
  const { description } = props;

    return (
        <>
          <div className="centered-container">
            <div className="section text-center grid gap-y-5">
                <h2 className="text-4xl">
                  <a id="about">About Us</a>
                </h2>
                <p className="p-10">{description}</p>
              </div>
          </div>
        </>
      );
    };

export default About;