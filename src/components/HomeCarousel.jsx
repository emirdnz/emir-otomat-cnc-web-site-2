import { Typography } from "@material-tailwind/react";
import { Carousel } from "flowbite-react";
import { useTranslation } from "react-i18next";

import carousel1 from "../assets/Carousel-1.jpg";
import carousel2 from "../assets/Carousel-2.jpg";

function HomeCarousel() {
  const { t } = useTranslation();
  const images = [carousel1, carousel2]
  const data = t('carouselData', { returnObjects: true });

  return (
    <section id="carousel">
      <Carousel
        className="h-[30rem]"
        loop={true}
        autoplaydelay={1000}
        aut={5000}
        pauseOnHover={true}
      >
        {data.map((item, index) => (
          <div key={index} className="relative h-full w-full">
            <img
              src={images[index]}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/60">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h4"
                  color="white"
                  className="mb-4 text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 opacity-80 max-h-28 line-clamp-2 overflow-scroll no-scrollbar md:line-clamp-none text-base lg:text-lg font-montserrat"
                >
                  {item.desc}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default HomeCarousel;
