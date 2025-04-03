import { useState } from "react";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

import cover from "../assets/2008.jpg";
import certificate1 from "../assets/certificates/9001.jpg";
import certificate2 from "../assets/certificates/14001.jpg";
import certificate3 from "../assets/certificates/10002.jpg";
import certificate4 from "../assets/certificates/31000.jpg";

const data = [
  { image: certificate1, title: "TS EN ISO 9001:2015" },
  { image: certificate2, title: "ISO 14001:2015" },
  { image: certificate3, title: "TS ISO 10002:2018" },
  { image: certificate4, title: "ISO 31000:2009" },
];

import { Dialog, DialogBody } from "@material-tailwind/react";
import TitleComponent from "../components/TitleComponent";

function Certificates() {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }

    setOpen((cur) => !cur);
  };

  const { t } = useTranslation();

  return (
    <section className="flex items-center justify-center flex-col my-10">
      {/* title */}
      <TitleComponent title={t("certificates")} cover={cover} />
      {/* title */}

      {/* <div className="flex flex-col items-center justify-center h-[30vh] px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Yapım Aşamasında
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Yakın zamanda tekrar kontrol ediniz.
        </p>
      </div> */}

      <section className="mt-10">
        <section className="h-full md:max-w-screen-xl flex-col flex items-center justify-center w-full md:mt-10 md:mb-16 transition-all duration-1000">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
            {data.map(({ image }, index) => (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration:
                      index % 4 == 0
                        ? 1.8
                        : index % 4 == 1
                        ? 1.4
                        : index % 4 == 2
                        ? 1.1
                        : 0.9,
                    ease: "easeInOut",
                  },
                }}
                viewport={{ once: true }}
                className=" border-2 rounded-lg hover:cursor-pointer"
                onClick={(e) => handleOpen(e)}
                key={index}
              >
                <img
                  className=" hover:bg-blue-gray-100 transition-color duration-1000 h-96 sm:h-[30rem] md:h-[30rem] w-full max-w-full rounded-lg object-cover object-center"
                  src={image}
                  alt="gallery-photo"
                />
                <h1>
                  <p className="text-center text-lg font-semibold text-gray-800">
                    {data[index].title}
                  </p>
                </h1>
              </motion.div>
            ))}
          </div>
        </section>

        <Dialog
          className="flex items-center justify-center transition-all duration-500"
          size="md"
          open={open}
          handler={handleOpen}
        >
          <DialogBody className="">
            <img
              alt="nature"
              className="rounded-lg object-contain"
              src={selectedImg}
            />
          </DialogBody>
        </Dialog>
      </section>

      {/* <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none m-8"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography className="mb-3 font-normal" variant="paragraph">
              Sertifikalar henüz yapım aşamasındadır. Yakın zamanda tekrar
              kontrol ediniz.
            </Typography>
            <Typography className="mb-3 font-normal" variant="paragraph">
              Bu sırada diğer sayfalarımızı ziyaret edebilirsiniz.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link to="/anasayfa" className="pb-2">
              <Button
                className="normal-case text-md mb-2"
                variant="gradient"
                onClick={handleOpen}
                fullWidth
              >
                Anasayfa
              </Button>
            </Link>
            <Link to="/calismalarimiz/urunler" className="pb-2">
              <Button
                className="normal-case text-md mb-2"
                variant="gradient"
                onClick={handleOpen}
                fullWidth
              >
                Ürünler
              </Button>
            </Link>
            <Link to="/calismalarimiz/makine-parkuru">
              <Button
                className="normal-case text-md !bg-primary-blue"
                variant="gradient"
                onClick={handleOpen}
                fullWidth
              >
                Makine Parkurumuz
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Dialog> */}
    </section>
  );
}

export default Certificates;
