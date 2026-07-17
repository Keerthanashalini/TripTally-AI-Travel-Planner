import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Compass, Map, Hotel } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuthStore();

  const handleNewTrip = async () => {
    if (!user) {
      await login();
      navigate("/create-trip");
    } else {
      navigate("/create-trip");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4  py-20 space-y-20">
      {/* Hero */}
      <motion.div
        className="max-w-4xl mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Discover Your Next Adventure with AI
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
            TripTally
          </span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Plan your dream trip in seconds. Powered by smart AI, we help you
          choose destinations, build an itinerary, and find the best hotels —
          automatically and personally tailored.
        </p>
        <Button size="lg" onClick={handleNewTrip} className="rounded-full px-4">
          Get Started
        </Button>
      </motion.div>

      {/* Fitur */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <Feature
          icon={<Compass className="w-8 h-8 text-blue-500" />}
          title="Personalized Destinations"
          description="Our AI understands your preferences and recommends the best places based on your travel style."
        />
        <Feature
          icon={<Map className="w-8 h-8 text-purple-500" />}
          title="Automatic Itinerary"
          description="Get a complete day-by-day plan, best times to visit, and efficient routes."
        />
        <Feature
          icon={<Hotel className="w-8 h-8 text-pink-500" />}
          title="Hotel Recommendations"
          description="Find accommodations with the best prices and trusted reviews, all in one click."
        />
      </motion.div>
    </section>
  );
};

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="text-left space-y-3 p-4 rounded-md hover:bg-muted/30 transition">
      <div>{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Home;
