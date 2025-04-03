import { useState } from "react";
import { useTranslation } from "react-i18next";

import cover from "../assets/2007.jpg";
import { Dialog, DialogBody } from "@material-tailwind/react";

import photo1 from "../assets/machines/1.png";
import photo2 from "../assets/machines/2.png";
import photo3 from "../assets/machines/3.png";
import photo4 from "../assets/machines/4.png";
import photo5 from "../assets/machines/5.png";
import photo6 from "../assets/machines/6.png";

import TitleComponent from "../components/TitleComponent";

function Machines() {
  const { t } = useTranslation();

  const data = [
    {
      imgelink: photo1,
    },
    {
      imgelink: photo2,
    },
    {
      imgelink: photo3,
    },
    {
      imgelink: photo4,
    },
    {
      imgelink: photo5,
    },
    {
      imgelink: photo6,
    },
  ];

  const [active, setActive] = useState(photo1);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }

    setOpen((cur) => !cur);
  };

  return (
    <section className="flex items-center justify-center flex-col my-10 ">
      {/* title */}
      <TitleComponent title={t('machines.title')} cover={cover} />
      {/* title */}
      <div className="grid gap-4 max-w-4xl mt-10">
        <div onClick={(e) => handleOpen(e)}>
          <img
            className="h-auto w-full max-w-full rounded-lg object-contain object-center md:h-[480px]"
            src={active}
            alt=""
          />
        </div>
        <div className="grid grid-cols-6 gap-2 px-2">
          {data.map(({ imgelink }, index) => (
            <div className="flex justify-center " key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className="h-20 w-32 cursor-pointer rounded-lg object-contain object-center border-2 hover:border-gray-400"
                alt="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogBody>
          <img
            alt={t('machines.dialogAlt')}
            className="max-h-[90vh] w-full rounded-lg object-contain object-center"
            src={selectedImg}
          />
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default Machines;
