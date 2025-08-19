import React from "react";

export default function BadModal() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }} >
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl">Modal Title</h2>
        <p>This is a modal that is not very accessible.</p>
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Close
        </button>
      </div>
    </div>
  );
}
