import cover from "../assets/2003.jpg";
import TitleComponent from "../components/TitleComponent";
import { useTranslation } from "react-i18next";

function ContactUs() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center flex-col my-10">
      {/* title */}
      <TitleComponent title={t("contactUs.title")} cover={cover} />
      {/* title */}
      <div className="flex flex-wrap mt-10 max-w-screen-xl">
        <div className="lg:min-w-[424px] max-w-96 flex flex-col min-h-64 border-b-[1px] xl:border-x-[1px] p-8">
          <div className="text-3xl text-primary-blue my-5">
            {t("contactUs.office")}
          </div>
          <span className="">
            {t("contactUs.address")}
          </span>
        </div>
        <div className="lg:min-w-[300px] max-w-96 flex flex-col min-h-64 border-b-[1px] xl:border-x-[1px] p-8">
          <div className="text-3xl text-primary-blue my-5">
            {t("contactUs.phone")}
          </div>
          <div className="flex flex-row items-center">
            <a
              href="tel:02126711740"
              className="flex items-center transition duration-700 ease-in-out hover:text-primary-blue"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1 fill-primary-blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span className="line-clamp-1 min-w-26 mr-1">
                {t("contactUs.phoneNumber")}
              </span>
            </a>
          </div>
        </div>
        <div
          className="lg:min-w-[300px] max-w-96 flex flex-col min-h-64
         border-b-[1px] xl:border-x-[1px] p-8"
        >
          <div className="text-3xl text-primary-blue my-5">
            {t("contactUs.email")}
          </div>
          <div>
            <a
              href="mailto:info@emirotomatcnc.com"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              <span className="flex items-center line-clamp-1 transition duration-700 ease-in-out hover:text-primary-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#427fda"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span className="line-clamp-1 text-ellipsis">
                  {t("contactUs.emailAddress")}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <iframe
        width={1024}
        height={400}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={t("contactUs.mapUrl")}
        style={{
          border: 0,
        }}
      />
    </div>
  );
}

export default ContactUs;
