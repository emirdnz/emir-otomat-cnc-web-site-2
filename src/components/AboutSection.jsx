import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";

function AboutSection() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {location.pathname !== "/hakkimizda" ? (
        <section className="h-96 flex-col flex items-center justify-center w-full ">
          <Card className="h-full overflow-hidden flex flex-row justify-center w-full shadow-transparent rounded-none">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none flex justify-center md:justify-end bg-blue-gray-50 pr-5 pt-16 w-full h-full text-4xl text-primary-blue"
            >
              <h1 className="text-center md:text-end font-bold max-w-lg text-pretty">
                {t("aboutSection.title")}<br/>
                <span className="text-gray-800  font-semibold text-pretty leading-[50px] ">
                 <Trans i18nKey="aboutSection.subtitle"></Trans> 
                </span>
                <br />
                <Link
                  className="text-primary-blue text-lg md:hidden"
                  to="/hakkimizda"
                >
                  {t("continue")}
                </Link>
              </h1>
            </CardHeader>
            <CardBody className="p-0 pl-5 md:pt-16 hidden md:block items-center md:items-start justify-evenly w-full ">
              <Typography
                variant="lead"
                color="gray"
                className="mb-3 font-normal overflow-scroll no-scrollbar max-w-lg font-montserrat text-base md:text-lg lg:text-lg"
              >
                {t("aboutSection.description1")}
              </Typography>
              <Link className="text-primary-blue" to="/hakkimizda">
                {" "}
                {t("continue")}
              </Link>
            </CardBody>
          </Card>
        </section>
      ) : (
        <section className=" h-full md:h-[450px]  flex-col flex items-center justify-center w-full ">
          <Card className="h-full overflow-hidden flex flex-row justify-center w-full shadow-transparent rounded-none">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none hidden md:flex justify-center md:justify-end bg-blue-gray-50 pr-5 pt-36 w-full h-full text-4xl text-primary-blue"
            >
              <h1 className="text-center w-full md:text-end font-bold max-w-lg text-pretty">
                {t("aboutSection.title")}<br/>
                <span className="text-gray-800  font-semibold text-pretty leading-[50px] ">
                <Trans i18nKey="aboutSection.subtitle"/> 
                </span>
                <br />
                <Link
                  className="text-primary-blue text-lg md:hidden"
                  to="/hakkimizda"
                >
                  {t("continue")}
                </Link>
              </h1>
            </CardHeader>
            <CardBody className="p-0 pl-5 pt-6 pb-6 md:pt-5 md:pb-0 my-auto flex flex-col items-center md:items-start justify-evenly w-full">
              <Typography
                variant="h3"
                className="text-center md:hidden font-montserrat md:text-end font-bold max-w-lg text-pretty text-primary-blue mb-2"
              >
                {t("aboutUs")}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className=" font-normal overflow-scroll no-scrollbar min-h max-w-lg pb-10 font-montserrat text-md text-pretty "
              >
                <Trans i18nKey="aboutSection.description2" />
                <br />
                <br />
                <Trans i18nKey="aboutSection.description3" />
                <br />
                <br />
                <Trans i18nKey="aboutSection.description4" />
                <br />
                <br />
                <Trans i18nKey="aboutSection.description5" />
              </Typography>
            </CardBody>
          </Card>
        </section>
      )}
    </>
  );
}

export default AboutSection;
