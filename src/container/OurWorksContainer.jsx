import TitleComponent from "../components/TitleComponent";
import WorkCard from "./../components/WorkCard";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function OurWorksContainer({ data, cover }) {
  const { t } = useTranslation();
  return (
    <>
      <TitleComponent title={t("ourWorksContainer.title")} cover={cover} />
      <section className="w-full mx-auto flex justify-center my-10">
        <WorkCard data={data} />
      </section>
    </>
  );
}

OurWorksContainer.propTypes = {
  data: PropTypes.array.isRequired,
  cover: PropTypes.string.isRequired,
};

export default OurWorksContainer;
