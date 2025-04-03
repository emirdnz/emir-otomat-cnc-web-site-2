import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation  } from "react-i18next";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function VisionMission() {
  const [select, setSelect] = useState("vision");
  const [check, setCheck] = useState(true);

  useEffect(() => {
    if (check) {
      setTimeout(() => {
        setSelect(select === "vision" ? "mission" : "vision");
        setCheck(true);
      }, 20000);
    }
    setCheck(false);
  }, [select,check]);

  const { t } = useTranslation();

  return (
    <>
      <section className="h-[500px] md:h-[400px]  flex-col flex items-center justify-center w-full bg-blue-gray-50">
        <Card className="h-full overflow-hidden flex flex-col pt-10 w-full shadow-transparent rounded-none bg-blue-gray-50">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none hidden md:flex justify-center bg-blue-gray-50  w-full text-4xl"
          >
            <h1 className="text-center font-bold max-w-lg text-pretty">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 1.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("vision")}
                onClick={() => setSelect("vision")}
                className={`text-primary-blue cursor-pointer underline transition-colors duration-[1500ms] ${
                  select == "vision"
                    ? " decoration-primary-blue"
                    : "decoration-blue-gray-50"
                }`}
              >
                {t("visionmission.vision")}
              </motion.span>{" "}
              {t("visionmission.and")}{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 2.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("mission")}
                onClick={() => setSelect("mission")}
                className={`text-primary-blue cursor-pointer underline transition-colors duration-[1500ms] ${
                  select == "mission"
                    ? " decoration-primary-blue"
                    : "decoration-blue-gray-50"
                }`}
              >
                {t("visionmission.mission")}
              </motion.span>
            </h1>
          </CardHeader>
          <CardBody className="p-1  flex flex-col items-center w-full">
            <Typography
              variant="h1"
              className="text-center md:hidden font-montserrat font-bold max-w-lg text-pretty mb-2 text-4xl"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 1.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("vision")}
                onClick={() => setSelect("vision")}
                className={`text-primary-blue cursor-pointer underline transition-colors duration-[1500ms] ${
                  select == "vision"
                    ? " decoration-primary-blue"
                    : "decoration-blue-gray-50"
                }`}
              >
                {t("visionmission.vision")}
              </motion.span>{" "}
              {t("visionmission.and")}{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 2.4, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelect("vision")}
                onClick={() => setSelect("mission")}
                className={`text-primary-blue cursor-pointer underline transition-colors duration-[1500ms] ${
                  select == "mission"
                    ? " decoration-primary-blue"
                    : "decoration-blue-gray-50"
                }`}
              >
                {t("visionmission.mission")}
              </motion.span>
            </Typography>
            <Typography
              variant="lead"
              color="gray"
              className="font-normal mt-14 overflow-scroll no-scrollbar md:max-w-xl font-montserrat text-md"
            >
              <div
                className={`absolute left-5 right-5 md:left-0 md:right-0 mx-auto md:max-w-3xl md:text-xl/6  ${
                  select == "vision" ? " opacity-100" : "invisible opacity-0 "
                } transition-all duration-[1500ms] ease-in-out`}
              >
                <div className="text-primary-blue font-light ">{t("visionmission.ourVision")}</div>
                {t("visionmission.visionDesc")}
              </div>
              <div
                className={`absolute left-5 right-5 md:left-0 md:right-0 mx-auto md:max-w-3xl md:text-xl/6  ${
                  select == "mission" ? " opacity-100" : "invisible opacity-0 "
                } transition-all duration-[1500ms] ease-in-out`}
              >
                <div className="text-primary-blue font-light ">{t("visionmission.ourMission")}</div>
                {t("visionmission.missionDesc")}
              </div>
            </Typography>
          </CardBody>
        </Card>
      </section>
    </>
  );
}

export default VisionMission;
