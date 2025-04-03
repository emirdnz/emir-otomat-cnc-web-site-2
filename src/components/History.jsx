import { useTranslation, Trans } from "react-i18next";

function History() {
  const { t } = useTranslation();

  return (
    <div className="md:w-1/2 border-b-[1px]">
      <ol className="relative border-s border-gray-200 dark:border-gray-700 pt-20 ml-4">
        <li className="mb-10 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            1986
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Trans i18nKey="history.1986" />
          </h3>
        </li>
        <li className="mb-10 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            2004
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Trans i18nKey="history.2004" />
          </h3>
        </li>
        <li className="mb-10 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            2013
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Trans i18nKey="history.2013" />
          </h3>
        </li>
        <li className="mb-10 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            2014
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Trans i18nKey="history.2014" />
          </h3>
        </li>
        <li className="mb-10 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            2018
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Trans i18nKey="history.2018" />
          </h3>
        </li>
        <li className="mb-10 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            2021
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Trans i18nKey="history.2021" />
          </h3>
        </li>
        <li className="pb-16 ms-4 group">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 group-hover:text-light-blue-700 transition-all duration-500 group-hover:font-semibold">
            2024
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("history.2024")}
            <Trans i18nKey="history.2024" />
          </h3>
        </li>
      </ol>
    </div>
  );
}

export default History;
