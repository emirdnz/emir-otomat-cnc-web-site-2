import PropTypes from "prop-types";

import {motion} from "framer-motion";

function TitleComponent({ title, cover }) {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-8 text-primary-blue w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="w-full text-center"
        >
          {"//"} <span className="text-black">{title}</span>
        </motion.div>
      </h1>
      <div className="h-96 w-full">
        <img
          className="object-cover h-full w-full"
          loading="lazy"
          src={cover}
          alt=""
        />
      </div>
    </div>
  );
}

TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default TitleComponent;
