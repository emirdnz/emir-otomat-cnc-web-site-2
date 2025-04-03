import { useState } from "react";

import cover from "../assets/2008.jpg";

import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import TitleComponent from "../components/TitleComponent";

function Quality() {
  const [open, setOpen] = useState(true);
  const [setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }

    setOpen((cur) => !cur);
  };
  return (
    <section className="flex items-center justify-center flex-col my-10">
      {/* title */}
      <TitleComponent title="Kalite Parkurumuz" cover={cover} />
      {/* title */}
      <div className="flex flex-col items-center justify-center h-[30vh] px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Yapım Aşamasında
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Yakın zamanda tekrar kontrol ediniz.
        </p>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none m-8"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography className="mb-3 font-normal" variant="paragraph">
              Kalite Parkurumuz henüz yapım aşamasındadır. Yakın zamanda tekrar
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
      </Dialog>
    </section>
  );
}

export default Quality;
