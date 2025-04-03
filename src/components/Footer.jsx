import { Link } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";

import logo from "../../public/logo2.png";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className=" bg-[#232a34] text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 lg:px-0">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex flex-row md:block">
            <a href="" className="flex items-center">
              <img src={logo} className="h-[64px] me-3" alt="Logo" />
            </a>
            <div>
              <div className=" w-52 opacity-45 text-sm m-2 mt-5">
                <Trans i18nKey="footer.address"></Trans>
              </div>
              <div className=" w-52 text-gray-400 text-sm mx-2 hover:underline">
                Tel:
                <a href="tel:02126711740">
                  <span className="text-white ml-2">{t("footer.tel")}</span>
                </a>
              </div>
              <div className=" w-52 text-gray-400 text-sm m-2 mb-0  hover:underline">
                Mail:
                <a href="mailto:info@emirotomatcnc.com">
                  <span className="text-white ml-2">
                    {t("footer.email")}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div></div>
          <div className="grid grid-cols-3 gap-8 md:gap-6 md:grid-cols-3">
            <div className="border-r-2 pr-6 border-opacity-40 border-[#7f8b9c]">
              <h2 className="mb-6 text-md font-semibold  pb-1 border-b-2 border-primary-blue">
              {t("footer.corporate")}
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link to="hakkimizda" className="hover:underline text-xs">
                  {t("footer.about")}
                  </Link>
                </li>

                <li className="mb-4">
                  <Link to="iletisim" className="hover:underline text-xs">
                  {t("footer.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="border-r-2 pr-6 border-opacity-40 border-[#7f8b9c]">
              <h2 className="mb-6 text-md font-semibold  pb-1 border-b-2 border-primary-blue">
              {t("footer.production")}
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link
                    to="calismalarimiz/urunler"
                    className="hover:underline text-xs "
                  >
                    {t("footer.ourWorks")}
                  </Link>
                </li>

                <li className="mb-4">
                  <Link to="sertifikalar" className="hover:underline text-xs">
                  {t("footer.certificates")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="calismalarimiz/makine-parkuru"
                    className="hover:underline text-xs"
                  >
                   {t("footer.machinePark")}
                  </Link>
                </li>
                {/* <li className="mb-4">
                  <Link to="kalite" className="hover:underline text-xs">
                    Kalite Parkurumuz
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-semibold  pb-1 border-b-2 border-primary-blue">
              {t("footer.career")}
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link to="kariyer" className="hover:underline text-xs">
                  {t("footer.jobApplication")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="staj" className="hover:underline text-xs">
                  {t("footer.internshipApplication")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2" />
        <div className="sm:flex sm:items-center sm:justify-between px-2">
          <span className="text-sm  sm:text-center ">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://emirotomatcnc.com/"
              className="hover:underline text-xs"
              target="_blank"
            >
              EMİR OTOMAT CNC MAKİNA SANAYİ VE TİCARET LİMİTED ŞİRKETİ
            </a>
          </span>
          <div className="flex mt-4 items-center justify-center sm:mt-0">
            <a
              href="https://www.linkedin.com/company/emirotomatcnc/"
              className=" hover:dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 48 48"
              >
                <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 15.5 13 A 2.5 2.5 0 0 0 15.5 18 A 2.5 2.5 0 0 0 15.5 13 z M 14 20 C 13.447 20 13 20.447 13 21 L 13 34 C 13 34.553 13.447 35 14 35 L 17 35 C 17.553 35 18 34.553 18 34 L 18 21 C 18 20.447 17.553 20 17 20 L 14 20 z M 21 20 C 20.447 20 20 20.447 20 21 L 20 34 C 20 34.553 20.447 35 21 35 L 24 35 C 24.553 35 25 34.553 25 34 L 25 26.5 C 25 25.121 26.121 24 27.5 24 C 28.879 24 30 25.121 30 26.5 L 30 34 C 30 34.553 30.447 35 31 35 L 34 35 C 34.553 35 35 34.553 35 34 L 35 26 C 35 22.691 32.309 20 29 20 C 27.462 20 26.063 20.586016 25 21.541016 L 25 21 C 25 20.447 24.553 20 24 20 L 21 20 z"></path>
              </svg>
              <span className="sr-only">LinkedIn page</span>
            </a>
            {/* <div className="scale-75 opacity-70">
              <span className="text-xs">Design by</span>
              <a
                href="https://ozanalikayaci.me/"
                className=" hover:dark:hover:text-white text-sm ml-1"
                target="_blank"
              >
                Ozan
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
