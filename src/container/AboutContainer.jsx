import PropTypes from "prop-types";
import Goals from "../components/Goals";
import VisionMission from "../components/VisionMission";
import History from "../components/History";

import AboutSection from "../components/AboutSection";
import TitleComponent from "../components/TitleComponent";
import { useTranslation } from "react-i18next";

function AboutContainer({ cover }) {
  const { t } = useTranslation();
  return (
    <>
      <TitleComponent title={t('title')} cover={cover} />
      <AboutSection />
      <History />
      <VisionMission />
      <Goals />
    </>
  );
}

AboutContainer.propTypes = {
  cover: PropTypes.string.isRequired,
};

export default AboutContainer;
