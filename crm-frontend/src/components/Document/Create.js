import React, { useState, useEffect } from "react";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [documentLink, setDocumentLink] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [links, setLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First Axios request
      const response1 = await axios.post(
        "https://crm-backend-o6sb.onrender.com/api/doc/createDocLink",
        {
          title: title,
          docLink: documentLink,
          uniqueLink: uniqueIdentifier,
        }
      );

      // Second Axios request with the combined URL
      const combinedURL = `https://www.qriocity.in/resource/${uniqueIdentifier}`;
      const response2 = await axios.post(
        "https://crm-backend-o6sb.onrender.com/api/link/createLink",
        {
          title: title,
          link: combinedURL,
        }
      );

      setTitle("");
      setDocumentLink("");
      setUniqueIdentifier("");
      getAllLinks(); // Refresh the links after submission
      // You can add more logic here to handle the response, e.g., show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message
    }
  };

  const getAllLinks = async () => {
    try {
      const { data } = await axios.get(
        "https://crm-backend-o6sb.onrender.com/api/link/getAlllink"
      );
      setLinks(data.links); // Update the state with fetched links
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(
      () => {
        console.log("Copied to clipboard: ", link);
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
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
      <div className="grid grid-cols-12 bg-[#2f2a7a] text-white mt-8 text-lg">
        <div className="col-span-4 p-4 font-bold">Title</div>
        <div className="col-span-6 p-4 font-bold">Links</div>
        <div className="col-span-2 p-4 font-bold text-left">Copy Link</div>
      </div>
      <div className="max-h-[75vh] overflow-y-scroll">
        {links.map((link, index) => (
          <div
            className="grid grid-cols-12 w-[675px] bg-blue-200 border-b border-gray-300 text-sm"
            key={index}
          >
            <div className="col-span-4 p-4 text-left flex flex-col gap-4">
              <h1 className="font-bold">{link.title}</h1>
            </div>
            <div className="col-span-6 p-4 text-left">
              <span className="font-bold">{link.link}</span>
            </div>
            <div className="col-span-2 p-4">
              <div
                className="py-2 bg-violet-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-violet-700"
                onClick={() => copyToClipboard(link.link)}
              >
                Copy
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
