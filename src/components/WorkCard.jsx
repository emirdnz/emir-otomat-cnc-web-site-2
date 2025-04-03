import { useState } from "react";
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";

import { motion } from "framer-motion";

function WorkCard(props) {

  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (e) => {
    if (e.target) {
      setSelectedImg(e.target.currentSrc);
    }

    setOpen((cur) => !cur);
  };

  return (
    <>
      <section className="h-full md:max-w-screen-xl flex-col flex items-center justify-center w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {props.data.map(({ image }, index) => (
            <motion.div
              initial={{ x: -50 , opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration:
                    index % 4 == 0
                      ? 0.55
                      : index % 4 == 1
                      ? 0.50
                      : index % 4 == 2
                      ? 0.45
                      : 0.4,
                  ease: "easeInOut",
                },
              }}
              viewport={{ once: true }}
              className="hover:border-gray-500 border-2 rounded-lg transition-all duration-500 cursor-pointer"
              onClick={(e) => handleOpen(e)}
              key={index}
            >
              <img
                className="transition-color duration-1000 h-80 w-full max-w-full rounded-lg p-8 object-scale-down object-center"
                src={image}
                alt="gallery-photo"
              />
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
            className="rounded-lg object-contain max-h-[90vh]"
            src={selectedImg}
          />
        </DialogBody>
      </Dialog>
    </>
  );
}

WorkCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default WorkCard;
