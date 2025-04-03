import cover from "../../assets/2004.jpg";

import AboutContainer from "../../container/AboutContainer";

function About() {
  return (
    <section className="flex items-center justify-center flex-col mt-10">
      {/* components */}
      <AboutContainer cover={cover} />
      {/* components */}
    </section>
  );
}

export default About;
