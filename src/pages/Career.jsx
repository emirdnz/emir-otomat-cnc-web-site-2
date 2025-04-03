import cover from "../assets/2006.jpg";
import { motion } from "framer-motion";
import image from "../assets/career.jpg";
import "./Career.css";
import TitleComponent from "../components/TitleComponent";
import { useTranslation } from "react-i18next";

function Career() {
  const { t } = useTranslation();
  const location = window.location.pathname;

  return (
    <div className="mt-10">
      {/* title */}
      <TitleComponent
        title={location === "/kariyer" ? t("career.title") : t("career.internshipTitle")}
        cover={cover}
      />
      {/* title */}
      <div className="flex justify-center ">
        <div className=" max-w-screen-lg flex justify-center items-center">
          <div className="max-w-[480px] hidden md:block">
            <img src={image} alt="" />
          </div>
          <div className="m-10 md:my-10">
            {t("career.description")}
            <h3 className="text-sm font-bold my-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                className="w-full"
              >
                <span className="text-black">
                  {t("career.qualitiesTitle")}
                </span>
              </motion.div>
            </h3>
            {t("career.qualitiesDescription")}
            <br />
            <br />
            {t("career.applyDescription")}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-8 text-primary-blue w-full mt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="w-full text-center"
          >
            <span className="text-black">
              {location === "/kariyer"
                ? t("career.jobFormTitle")
                : t("career.internshipFormTitle")}
            </span>
          </motion.div>
        </h1>
      </div>
      <div className="jotform-form">
        <iframe
          id="JotFormIFrame-240543893849975"
          title={t("career.jobFormTitle")}
          onLoad="window.parent.scrollTo(0,0)"
          // eslint-disable-next-line react/no-unknown-property
          allowTransparency="true"
          allowFullScreen="true"
          src="https://form.jotform.com/240595114447053"
          style={{
            width: "1px",
            minWidth: "100%",
            height: "100%",
            border: "none",
          }}
          className="overflow-hidden w-full min-h-[1500px] md:min-h-[1300px]"
        ></iframe>
      </div>
    </div>
  );
}

export default Career;
