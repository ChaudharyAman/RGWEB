import { motion } from "framer-motion";

// ─── Logo Imports ─────────────────────────────────────────────────────────────
import techMahindra from "../components/assets/clients/techMahindra.png";
import comviva from "../components/assets/clients/comviva.png";
import insuranceDekho from "../components/assets/clients/insauranceDekho.png";
import tbo from "../components/assets/clients/tbo.com.png";
import hp from "../components/assets/clients/hp.png";
import annalect from "../components/assets/clients/annalect.png";
import vega from "../components/assets/clients/vegaInnovations.png";
import zensar from "../components/assets/clients/zenSar.png";
import landmark from "../components/assets/clients/landmarkGroup.png";
import biocell from "../components/assets/clients/bioxcel.png";
import cardekho from "../components/assets/clients/carDekho.png";

// ─── Client Data ──────────────────────────────────────────────────────────────
const clients = [
  { name: "Tech Mahindra", logo: techMahindra },
  { name: "Comviva", logo: comviva },
  { name: "InsuranceDekho", logo: insuranceDekho },
  { name: "TBO", logo: tbo },

  { name: "HP", logo: hp },
  { name: "Annalect", logo: annalect },
  { name: "Vega Innovations", logo: vega },
  { name: "Zensar", logo: zensar },

  { name: "Landmark Group", logo: landmark },
  { name: "Biocell", logo: biocell },
  { name: "CarDekho", logo: cardekho },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Clients() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Clients
            </span>
          </motion.h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading enterprises across telecom, IT, cloud, and
            digital platforms worldwide.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                h-32
                flex items-center justify-center
                p-6
                hover:shadow-lg
                transition-all duration-300
              "
            >
              <motion.img
                src={client.logo}
                alt={client.name}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="
                   max-h-16 md:max-h-20
                  max-w-35
                  object-contain
                  grayscale
                  hover:grayscale-0
                  transition duration-300
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
