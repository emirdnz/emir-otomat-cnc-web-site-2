import { useEffect, useState } from "react";
import { Typography, Dialog, DialogBody } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

import pirinc from "../assets/products/pirinc.png";
import otomat from "../assets/products/otomat.png";
import tibbi from "../assets/products/tibbi.png";
import aluminyum from "../assets/products/aluminyum.png";
import paslanmaz from "../assets/products/paslanmaz.png";
import yuksekKarbon from "../assets/products/yuksek-karbonlu-celik.webp";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

function OurWorksSection() {
  const [autoplay, setAutoplay] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [slides, setSlides] = useState(window.innerWidth >= 1000 ? 2.5 : 1.5);
  const { t } = useTranslation();

  const [works] = useState([
    {
      img: pirinc,
      title: t("ourWorksSection.work1.title"),
      desc: t("ourWorksSection.work1.desc"),
    },
    {
      img: otomat,
      title: t("ourWorksSection.work2.title"),
      desc: t("ourWorksSection.work2.desc"),
    },
    {
      img: tibbi,
      title: t("ourWorksSection.work3.title"),
      desc: t("ourWorksSection.work3.desc"),
    },
    {
      img: aluminyum,
      title: t("ourWorksSection.work4.title"),
      desc: t("ourWorksSection.work4.desc"),
    },
    {
      img: paslanmaz,
      title: t("ourWorksSection.work5.title"),
      desc: t("ourWorksSection.work5.desc"),
    },
    {
      img: yuksekKarbon,
      title: t("ourWorksSection.work6.title"),
      desc: t("ourWorksSection.work6.desc"),
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setSlides(window.innerWidth >= 1000 ? 2.5 : 1.5);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setAutoplay(!open);
  }, [open]);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }
    setOpen((cur) => !cur);
  };

  return (
    <section className="bg-gray-50">
      {/* Başlık Alanı */}
      <div className="w-full bg-gray-50 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <Typography
            variant="h1"
            className="text-2xl md:text-3xl lg:text-4xl font-montserrat text-center"
          >
            <span className="font-semibold text-primary-blue">
              {t("ourWorksSection.title")}
            </span>
          </Typography>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Açıklama Alanı */}
          <div className="w-full md:w-1/3 p-6">
            <div className="pt-12">
              <Typography
                variant="h6"
                className="text-lg md:text-xl font-montserrat text-gray-700"
              >
                {t("ourWorksSection.description")}
              </Typography>
            </div>
          </div>

          {/* Ürün Galerisi */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg border-r-2 border-gray-200 shadow-sm">
            <Swiper
              autoplay={{
                delay: open ? 1000000 : 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={slides}
              className="w-full h-[300px]"
            >
              {works.map((work, i) => (
                <SwiperSlide
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  key={i}
                >
                  <div className="relative h-full group">
                    <img
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                      src={work.img}
                      onClick={(e) => handleOpen(e)}
                      alt={work.desc}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-2 px-3">
                      <h3 className="font-bold text-base md:text-lg text-center text-gray-900">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <Dialog
        className="flex items-center justify-center duration-500"
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="max-w-xl max-h-xl">
          <img
            alt="Selected"
            className="rounded-lg object-cover object-center"
            src={selectedImg}
          />
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default OurWorksSection;
