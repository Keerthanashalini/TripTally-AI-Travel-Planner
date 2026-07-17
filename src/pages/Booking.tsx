import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { useTripStore } from "../store/useTripStore";
import cities from "@/api/cities.json";

const Booking: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();

  const { getTripDetail, trip } = useTripStore();

  useEffect(() => {
    if (tripId) {
      getTripDetail(tripId);
    }
  }, [tripId]);

  if (!trip || !("tripSelection" in trip)) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const { tripSelection } = trip;

  const destinationCountry =
    cities.find((city: any) => city.name === tripSelection.destination)
      ?.country || "India";

  const isInternational = destinationCountry !== "India";

  const currencyMap: Record<string, string> = {
    India: "₹",
    USA: "$",
    Japan: "¥",
    Switzerland: "CHF",
    France: "€",
    Italy: "€",
    Spain: "€",
    "United Kingdom": "£",
    Australia: "A$",
    Canada: "C$",
    Singapore: "S$",
    Thailand: "฿",
    Indonesia: "Rp",
    Malaysia: "RM",
    "South Korea": "₩",
    Turkey: "₺",
    "United Arab Emirates": "AED",
    Maldives: "MVR",
  };

  const currency = currencyMap[destinationCountry] || "₹";

  let flightFare = "";
  let flightDuration = "";
  let trainFare = "";
  let trainDuration = "";

  if (isInternational) {
    flightFare = `${currency}35,000 - ${currency}90,000`;
    flightDuration = "6 - 14 Hours";

    trainFare = "Not Available";
    trainDuration = "Not Available";
  } else {
    flightFare = `${currency}3,000 - ${currency}8,000`;
    flightDuration = "1 - 3 Hours";

    trainFare = `${currency}300 - ${currency}2,500`;
    trainDuration = "6 - 24 Hours";
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Flight Recommendation */}

      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          ✈️ Flight Recommendation
        </h2>

        <div className="bg-white rounded-2xl border shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500">Departure</p>
              <p className="font-bold text-xl">{tripSelection.departure}</p>
            </div>

            <div>
              <p className="text-gray-500">Destination</p>
              <p className="font-bold text-xl">{tripSelection.destination}</p>
            </div>

            <div>
              <p className="text-gray-500">Estimated Flight Fare</p>
              <p className="text-green-600 font-bold text-lg">{flightFare}</p>
            </div>

            <div>
              <p className="text-gray-500">Estimated Duration</p>
              <p className="font-semibold">{flightDuration}</p>
            </div>

            <div>
              <p className="text-gray-500">Popular Airlines</p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge>IndiGo</Badge>
                <Badge>Air India</Badge>
                <Badge>Akasa Air</Badge>
                {isInternational && (
                  <>
                    <Badge>Emirates</Badge>
                    <Badge>Singapore Airlines</Badge>
                    <Badge>Qatar Airways</Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() =>
                window.open("https://www.makemytrip.com/flights/", "_blank")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              🔍 Search Flights
            </button>
          </div>
        </div>
      </div>
      {/* Train Recommendation */}

      <div>
        <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          🚆 Train Recommendation
        </h2>

        <div className="bg-white rounded-2xl border shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500">Departure</p>
              <p className="font-bold text-xl">{tripSelection.departure}</p>
            </div>

            <div>
              <p className="text-gray-500">Destination</p>
              <p className="font-bold text-xl">{tripSelection.destination}</p>
            </div>

            <div>
              <p className="text-gray-500">Estimated Train Fare</p>

              <p className="text-green-600 font-bold text-lg">{trainFare}</p>
            </div>

            <div>
              <p className="text-gray-500">Estimated Duration</p>

              <p className="font-semibold">{trainDuration}</p>
            </div>

            <div>
              <p className="text-gray-500">Available Classes</p>

              {isInternational ? (
                <p className="text-red-500 font-medium">
                  Train service is not available for international destinations.
                </p>
              ) : (
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Badge>Sleeper</Badge>
                  <Badge>3A</Badge>
                  <Badge>2A</Badge>
                  <Badge>1A</Badge>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {!isInternational ? (
              <button
                onClick={() =>
                  window.open("https://www.irctc.co.in/", "_blank")
                }
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl"
              >
                🚆 Search Trains
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-8 py-3 rounded-xl cursor-not-allowed"
              >
                🚫 Train Not Available
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
