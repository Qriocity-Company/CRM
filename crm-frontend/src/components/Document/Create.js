import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";

const Create = () => {
  const [title, setTitle] = useState("");
  const [documentLink, setDocumentLink] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First Axios request
      const combinedURL = `https://www.qriocity.in/resource/${uniqueIdentifier}`;
      await axios.post(
        `${API_URL}/api/doc/createDocLink`,
        {
          title: title,
          docLink: documentLink,
          uniqueLink: uniqueIdentifier,
          newLink: combinedURL,
        }
      );

      // Second Axios request with the combined URL



      setTitle("");
      setDocumentLink("");
      setUniqueIdentifier("");
      // You can add more logic here to handle the response, e.g., show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8 mt-14">
        <h2 className="text-2xl font-bold mb-6">Create Document Link</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="documentLink"
            >
              Document Link
            </label>
            <input
              type="url"
              id="documentLink"
              value={documentLink}
              onChange={(e) => setDocumentLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="uniqueIdentifier"
            >
              Unique Identifier
            </label>
            <input
              type="text"
              id="uniqueIdentifier"
              value={uniqueIdentifier}
              onChange={(e) => setUniqueIdentifier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

    </div>
  );
};

export default Create;
