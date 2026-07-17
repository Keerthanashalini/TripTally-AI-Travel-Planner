import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTripStore } from "../store/useTripStore";
import cities from "@/api/cities.json";
import NotFound from "./NotFound";

interface Hotel {
  name: string;
  type: string;
  price_range: string;
  notes: string;
  address?: string;
  rating?: string;
}

const Hotels: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();

  const { getTripDetail, trip } = useTripStore();

  useEffect(() => {
    if (tripId) {
      getTripDetail(tripId);
    }
  }, [tripId, getTripDetail]);

  if (!trip || !("tripSelection" in trip)) {
    return <NotFound />;
  }

  const { tripSelection, tripData } = trip;

  const totalDays = tripData?.daily_plan?.length || 1;

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

  const destinationCountry =
    cities.find((city) => city.name === tripSelection.destination)?.country ||
    "India";

  const currency = currencyMap[destinationCountry] || "₹";

  const hotelCost = totalDays * 2500;
  const foodCost = totalDays * 800;
  const transportCost = totalDays * 400;
  const flightCost = 6000;

  const totalCost = hotelCost + foodCost + transportCost + flightCost;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-br from-sky-50 via-white to-cyan-50 min-h-screen">
      {/* Paste the Hotel Recommendations UI here */}
      {/* Hotel Recommendations */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
          🏨 Recommended Hotels
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(Array.isArray(tripData?.hotel_recommendation)
            ? tripData.hotel_recommendation
            : tripData?.hotel_recommendation
              ? [tripData.hotel_recommendation]
              : []
          ).map((hotel: Hotel, idx: number) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden shadow-xl border bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-5">
                <h3 className="text-2xl font-bold">{hotel.name}</h3>

                <div className="flex gap-3 mt-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    🏨 {hotel.type}
                  </span>

                  <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                    💰 {hotel.price_range}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📍</div>

                  <div>
                    <p className="font-semibold text-slate-700">
                      Why this hotel?
                    </p>

                    <p className="text-gray-600 leading-7">{hotel.notes}</p>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Recommended Stay
                  </span>

                  <span className="font-bold text-orange-600">
                    ⭐ Great Choice
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paste the Estimated Trip Budget UI here */}
      {/* Estimated Trip Cost */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
          💰 Estimated Trip Budget
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Hotel */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">🏨 Hotel</p>
            <h3 className="text-3xl font-bold mt-3">
              {currency}
              {hotelCost.toLocaleString()}
            </h3>
          </div>

          {/* Flight */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">✈️ Flight</p>
            <h3 className="text-3xl font-bold mt-3">
              {currency}
              {flightCost.toLocaleString()}
            </h3>
          </div>

          {/* Food */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">🍽️ Food</p>
            <h3 className="text-3xl font-bold mt-3">
              {currency}
              {foodCost.toLocaleString()}
            </h3>
          </div>

          {/* Transport */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">🚕 Transport</p>
            <h3 className="text-3xl font-bold mt-3">
              {currency}
              {transportCost.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Total Cost Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg opacity-90">Total Estimated Budget</p>
              <h2 className="text-4xl font-bold mt-2">
                {currency}
                {totalCost.toLocaleString()}
              </h2>
            </div>

            <div className="text-6xl">💳</div>
          </div>
        </div>
      </div>

      {/* Paste the Booking Button UI here */}
      {/* Continue to Booking */}
      <div className="mt-14">
        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-8 text-white shadow-2xl text-center">
          <h2 className="text-3xl font-bold mb-3">
            ✈️ Ready to Book Your Trip?
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            Explore flight and train options to complete your travel plan.
          </p>

          <button
            onClick={() => navigate(`/booking/${tripId}`)}
            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300"
          >
            ✈️ Book Flights & 🚆 Trains
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
