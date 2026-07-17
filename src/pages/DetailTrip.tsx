import { emojiMap } from "../config/state";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useTripStore } from "../store/useTripStore";
import NotFound from "./NotFound";

interface Activity {
  time: string;
  location: string;
  activity: string;
  estimated_cost: string;
  recomendations?: string[];
  notes?: string;
}

interface DailyPlan {
  day: string;
  transportation: string;
  activities: Activity[];
}

interface Hotel {
  name: string;
  type: string;
  price_range: string;
  notes: string;
}

const DetailTrip: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const { getTripDetail, trip, fetchWikipediaImage } = useTripStore();

  useEffect(() => {
    if (tripId) {
      getTripDetail(tripId);
    }
  }, [getTripDetail, tripId]);

  useEffect(() => {
    if (trip && "tripSelection" in trip) {
      fetchWikipediaImage(trip.tripSelection.destination).then((img) => {
        if (img) setImage(img);
      });
    }
  }, [trip, fetchWikipediaImage]);

  if (!trip || !("tripSelection" in trip)) return <NotFound />;

  const { tripSelection, tripData } = trip;
  const totalDays = tripData?.daily_plan?.length || 1;

  // Estimated costs
  const hotelCost = totalDays * 2500;
  const foodCost = totalDays * 800;
  const transportCost = totalDays * 400;
  const flightCost = 6000;

  const totalCost = hotelCost + foodCost + transportCost + flightCost;
  useEffect(() => {
    if (!tripSelection?.destination) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${tripSelection.destination}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Weather Error:", error);
      });
  }, [tripSelection.destination]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-br from-sky-50 via-white to-cyan-50 min-h-screen">
      {/* Hero Image */}
      {image && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg mb-6">
          <img
            src={image}
            alt={tripSelection?.destination}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-800">
          {tripSelection?.departure} - {tripSelection?.destination}
        </h2>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(tripSelection).map(([key, value]: [string, string]) => (
          <Badge key={key} variant="outline">
            {emojiMap[value] || ""} {value}
          </Badge>
        ))}
      </div>
      {/* Summary */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
        <h2 className="text-3xl font-bold mb-5">📖 Summary</h2>

        <p className="text-lg leading-8 text-gray-600">{tripData.summary}</p>
      </div>
      {/* Weather */}
      {weather && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-2">
            🌦️ Weather Forecast
          </h2>

          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(weather.main.temp)}°C
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-semibold">{weather.weather[0].main}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Daily Plan */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          📅 Daily Plan
        </h2>

        {tripData?.daily_plan?.map((day: DailyPlan, idx: number) => (
          <div key={idx} className="mb-12">
            {/* Day Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">{day.day}</h3>

              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium shadow">
                🚖 {day.transportation}
              </div>
            </div>

            <div className="space-y-6">
              {day.activities.map((act: Activity, i: number) => (
                <div
                  key={i}
                  className="grid md:grid-cols-4 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
                >
                  {/* TIME */}
                  <div className="bg-gradient-to-b from-blue-500 to-cyan-500 text-white p-6 flex flex-col justify-center">
                    <p className="text-lg font-bold">{act.time}</p>
                  </div>

                  {/* ACTIVITY */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-800 mb-3">
                      📍 {act.location}
                    </h3>

                    <p className="text-gray-700 leading-7">🎯 {act.activity}</p>

                    {act.estimated_cost &&
                      act.estimated_cost !== "0" &&
                      act.estimated_cost !== "Rp 0" && (
                        <p className="mt-5 text-green-600 font-bold text-lg">
                          💰 {act.estimated_cost}
                        </p>
                      )}
                  </div>

                  {/* RECOMMENDATIONS */}
                  <div className="border-l p-6">
                    <h4 className="font-bold text-purple-600 mb-4">
                      ⭐ Nearby
                    </h4>

                    {act.recomendations?.length ? (
                      <ul className="space-y-2">
                        {act.recomendations.map((r: string, index: number) => (
                          <li
                            key={index}
                            className="bg-purple-50 rounded-full px-3 py-2 text-sm"
                          >
                            {r}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No recommendations</p>
                    )}
                  </div>

                  {/* NOTES */}
                  <div className="bg-yellow-50 p-6">
                    <h4 className="font-bold text-amber-700 mb-4">
                      📝 Important Notes
                    </h4>

                    <p className="text-gray-700 leading-7">
                      {act.notes || "No additional notes"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Travel Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-2">
          💡 Travel Tips
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          {(Array.isArray(tripData?.travel_tips)
            ? tripData.travel_tips
            : []
          ).map((tip: any, idx: number) => (
            <li key={idx}>
              {typeof tip === "string"
                ? tip
                : tip.tip || tip.tips || JSON.stringify(tip)}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => navigate(`/hotels/${tripId}`)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          🏨 View Hotels & Budget
        </button>
      </div>
    </div>
  );
};

export default DetailTrip;
