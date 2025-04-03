import { useTranslation } from "react-i18next";
import { FaRocket, FaCar, FaShieldAlt, FaMobileAlt, FaIndustry, FaMicrochip, FaMedkit, FaBolt, FaRobot } from "react-icons/fa";

function IndustriesSection() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: FaRocket,
      title: t("industries.aerospace"),
    },
    {
      icon: FaCar,
      title: t("industries.automotive"),
    },
    {
      icon: FaShieldAlt,
      title: t("industries.defense"),
    },
    {
      icon: FaMobileAlt,
      title: t("industries.consumer"),
    },
    {
      icon: FaIndustry,
      title: t("industries.industrial"),
    },
    {
      icon: FaMicrochip,
      title: t("industries.electronics"),
    },
    {
      icon: FaMedkit,
      title: t("industries.medical"),
    },
    {
      icon: FaBolt,
      title: t("industries.energy"),
    },
    {
      icon: FaRobot,
      title: t("industries.robotics"),
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("industries.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <industry.icon className="w-12 h-12 text-primary-blue mb-4" />
              <h3 className="text-lg font-semibold text-center">{industry.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
