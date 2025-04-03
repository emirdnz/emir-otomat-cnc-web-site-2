import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";

function Goals() {
  const { t } = useTranslation();

  return (
    <>
      <section className="h-full md:h-[30rem] flex flex-col items-center justify-center">
        <div className="h-full w-full md:max-w-screen-xl md:flex flex-col justify-center item-center">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
              y: 0,
            }}
            viewport={{ once: true }}
            className="flex justify-center items-center h-3/4"
          >
            <Typography
              variant="h1"
              color="gray"
              className="mb-4 text-2xl md:text-3xl lg:text-4xl font-montserrat text-end font-light"
            >
              <span className="font-semibold text-primary-blue">
                {t('goals.title')}
              </span>
            </Typography>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:item-center md:h-full md:border-y-2">
            <div className="md:flex group md:flex-col p-12  sm:m-0 border-2 md:border-r-2 md:border-l-0 md:border-y-0 md:w-full">
              <div className="mt-2">
                <h3>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 1.2, ease: "easeInOut" },
                      y: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="leading-10 group-hover:text-primary-blue group-hover:text-lg group-hover:font-extrabold transition-all ease-in-out duration-500">
                      {t('goals.pricing.title')}
                    </div>
                    <div className="group-hover:font-semibold transition-all ease-in-out duration-500">
                      {t('goals.pricing.description')}
                    </div>
                  </motion.div>
                </h3>
              </div>
            </div>
            <div className="md:flex group md:flex-col p-12  sm:m-0 border-2 md:border-r-2 md:border-l-0 md:border-y-0  md:w-full">
              <div className="mt-1 ">
                <h3>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 1.5, ease: "easeInOut" },
                      y: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="leading-10 group-hover:text-primary-blue group-hover:text-lg group-hover:font-extrabold transition-all ease-in-out duration-500">
                      {t('goals.quality.title')}
                    </div>
                    <div className="group-hover:font-semibold transition-all ease-in-out duration-500">
                      {t('goals.quality.description')}
                    </div>
                  </motion.div>
                </h3>
              </div>
            </div>
            <div className="md:flex group md:flex-col p-12  sm:m-0 border-2 md:border-x-0 md:border-y-0 md:w-full">
              <div className="mt-2">
                <h3>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 1.8, ease: "easeInOut" },
                      y: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="leading-10 group-hover:text-primary-blue group-hover:text-lg group-hover:font-extrabold transition-all ease-in-out duration-500">
                      {t('goals.satisfaction.title')}
                    </div>
                    <div className="group-hover:font-semibold transition-all ease-in-out duration-500">
                      {t('goals.satisfaction.description')}
                    </div>
                  </motion.div>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Goals;
