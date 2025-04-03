import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { SquaresPlusIcon, UserGroupIcon } from "@heroicons/react/24/solid";

import logo from "../../public/logo.png";

const navListMenuItems = [
  [
    {
      title: "products",
      icon: SquaresPlusIcon,
      link: "calismalarimiz/urunler",
    },
    {
      title: "machine_park",
      icon: UserGroupIcon,
      link: "calismalarimiz/makine-parkuru",
    },
  ],
  [
    {
      title: "certificates",
      icon: SquaresPlusIcon,
      link: "sertifikalar",
    },
  ],
  [
    {
      title: "job_application",
      icon: SquaresPlusIcon,
      link: "kariyer",
    },
    {
      title: "internship_application",
      icon: UserGroupIcon,
      link: "staj",
    },
  ],
];

function NavListMenu(props) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = props.data.map(
    ({ icon, title, descripton, link }, key) => (
      <Link to={link} key={key}>
        <List className="gap-1 rounded-lg">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="p-0 flex items-center text-sm font-bold font-montserrat transition duration-700 ease-in-out hover:text-primary-blue"
            >
              {t(`nav.${title}`)}
            </Typography>
          </div>
        </List>
      </Link>
    )
  );

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="li"
            variant="h6"
            color="blue-gray"
            className="p-0 font-bold font-montserrat transition duration-700 ease-in-out hover:text-primary-blue"
          >
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {props.title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform duration-700 lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform duration-700 lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block ">
          <ul className="outline-none outline-0 ">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}

function NavList() {
  const { t } = useTranslation();
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link to="/" className="flex items-center mx-2">
        <Typography
          as="li"
          variant="h6"
          color="blue-gray"
          className="p-0 font-bold font-montserrat transition duration-700 ease-in-out hover:text-primary-blue"
        >
          {t("nav.home")}
        </Typography>
      </Link>
      <Link to="hakkimizda" className="flex items-center mx-2">
        <Typography
          as="li"
          variant="h6"
          color="blue-gray"
          className="p-0 font-bold font-montserrat transition duration-700 ease-in-out hover:text-primary-blue"
        >
          {t("nav.about")}
        </Typography>
      </Link>
      <NavListMenu data={navListMenuItems[0]} title={t("nav.works")} />
      <NavListMenu data={navListMenuItems[1]} title={t("nav.quality")} />
      <NavListMenu data={navListMenuItems[2]} title={t("nav.career")} />
      <Link to="iletisim" className="flex items-center mx-2">
        <Typography
          as="li"
          variant="h6"
          color="blue-gray"
          className="p-0 font-bold font-montserrat transition duration-700 ease-in-out hover:text-primary-blue"
        >
          {t("nav.contact")}
        </Typography>
      </Link>
    </List>
  );
}

function Header() {
  const [langStorage, setLangStorage] = useState(
    localStorage.getItem("language")
  );
  const [openNav, setOpenNav] = useState(false);
  const [openWorks, setOpenWorks] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const [openCareer, setOpenCareer] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 660) {
        setOpenNav(false);
        setOpenCareer(false);
        setOpenQuality(false);
        setOpenWorks(false);
      }
    });
  }, []);

  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    //TODO: disable button when language is already selected
    window.location.reload(); // Refresh the page after changing the language
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // Save language to localStorage
  };

  return (
    <>
      <nav className=" border-b-2 border-slate-200 bg-slate-100 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2 leading-8">
          <div>
            <button
              className={`text-sm  text-gray-500 dark:text-white  ${
                langStorage === "tr" ? "text-primary-blue font-bold" : "hover:underline hover:font-bold"
              }`}
              onClick={() => handleLanguageChange("tr")}
              style={{ marginRight: "10px" }}
              disabled={langStorage === "tr"}
            >
              TR
            </button>
            <button
              className={`text-sm  text-gray-500 dark:text-white  ${
                langStorage === "en" ? "text-primary-blue font-bold" : "hover:underline"
              }`}
              onClick={() => handleLanguageChange("en")}
              disabled={langStorage === "en"}
            >
              EN
            </button>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="flex items-center text-primary-blue">
              <span className="text-sm  text-gray-500 dark:text-white hover:underline">
                <a
                  href="tel:02126711740"
                  className="flex items-center ml-2 transition duration-700 ease-in-out hover:text-primary-blue"
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
                  <span className="line-clamp-1 min-w-24 md:min-w-24 mr-1">
                    +90 (212) 671 17 40
                  </span>
                </a>
              </span>
              <a
                href="mailto:info@emirotomatcnc.com"
                className="text-sm  text-gray-500 dark:text-white hover:underline"
              >
                <span className="flex items-center ml-2 line-clamp-1 transition duration-700 ease-in-out hover:text-primary-blue">
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
                  <span className="line-clamp-1 text-ellipsis w-24 md:w-full">
                    info@emirotomatcnc.com
                  </span>
                </span>
              </a>
              <a
                href="https://maps.app.goo.gl/69vrJ4qrDz3UmQ9y6"
                className="text-sm  text-gray-500 dark:text-white hover:underline"
                target="_blank"
              >
                <span className="flex items-center ml-2 line-clamp-1 transition duration-700 ease-in-out hover:text-primary-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 30 30"
                    fill="#427fda"
                    className="w-5 h-5 mr-1"
                  >
                    <path d="M9.8 3.6C6.8 5.2 4 9.7 4 13c0 3.1 1.8 6.1 6 10 2 1.9 4 4.2 4.3 5 .6 1.3.8 1.3 1.4 0 .3-.8 2.3-3.1 4.3-5 6.2-5.8 7.3-9.6 4.5-15S15.1.6 9.8 3.6zm7.7 9.4c0 1.8-.6 2.6-2.3 2.8-1.3.2-2.5-.3-2.8-1.2-1-2.6.4-4.8 2.8-4.4 1.7.2 2.3 1 2.3 2.8z" />
                  </svg>
                  <span className="line-clamp-1 text-ellipsis min-w-16 md:">
                    İkitelli Osb
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-3 py-3">
        <div className="flex items-center max-w-screen-xl mx-auto justify-between text-blue-gray-900">
          <Link
            to="/"
            className="mr-4 cursor-pointer  font-medium flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-16" alt="Logo" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <NavList />
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;
