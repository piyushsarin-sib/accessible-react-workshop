import React from "react";

export default function BadButton() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }} >
      <button className="px-4 py-2 text-lg text-white bg-red-500 rounded hover:bg-red-600">
        I am a Bad Button
      </button>
    </div>
  );
}
