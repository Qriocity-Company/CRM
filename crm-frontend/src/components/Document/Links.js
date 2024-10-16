import React, { useState, useEffect } from "react";
import axios from "axios";

function Links() {
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortAscending, setSortAscending] = useState(true);

  const getAllLinks = async () => {
    try {
      const { data } = await axios.get(
        "https://crm-backend-o6sb.onrender.com/api/doc/getAlldoc"
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

  const deleteLink = async (id) => {
    console.log(id);
    try {
      await axios.post(`https://crm-backend-o6sb.onrender.com/api/doc/delete`, {
        id,
      });
      setLinks(links.filter((link) => link._id !== id));
      alert("Link deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(links.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const indexOfLastLink = currentPage * itemsPerPage;
  const indexOfFirstLink = indexOfLastLink - itemsPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const sortLinksByDate = () => {
    const sortedLinks = [...links].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortAscending ? dateA - dateB : dateB - dateA;
    });
    setLinks(sortedLinks);
    setSortAscending(!sortAscending);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-1">
      <div className="w-full ">
        <div className="grid grid-cols-16 bg-[#2f2a7a] text-white mt-8 text-lg">
          <div className="col-span-1 p-4 font-bold">S.No.</div>
          <div className="col-span-2 p-4 font-bold">Title</div>
          <div className="col-span-4 p-4 font-bold">Links</div>
          <div className="col-span-4 p-4 font-bold">Doc Link</div>
          <div className="col-span-2 p-4 font-bold">Identifier</div>
          <div className="col-span-1 p-4 font-bold text-center">Copy</div>
          <div className="col-span-1 p-4 font-bold text-center">Delete</div>
          <div
            className="col-span-1 p-4 font-bold text-center cursor-pointer"
            onClick={sortLinksByDate}
          >
            Date {sortAscending ? "↑" : "↓"}
          </div>
        </div>
        <div className="max-h-[60vh] ">
          {currentLinks.map((link, index) => (
            <div
              className="grid grid-cols-16 bg-blue-200 border-b border-gray-300 text-sm"
              key={link._id}
            >
              <div className="col-span-1 p-4 text-left">
                {indexOfFirstLink + index + 1}
              </div>
              <div className="col-span-2 p-4 text-left flex flex-col gap-4">
                <h1 className="font-bold whitespace-normal break-words">
                  {link.title}
                </h1>
              </div>
              <div className="col-span-4 p-4 text-left whitespace-normal break-words">
                <span className="font-bold">{link.newLink}</span>
              </div>
              <div className="col-span-4 p-4 text-left whitespace-normal break-words">
                <span className="font-bold">{link.docLink}</span>
              </div>
              <div className="col-span-2 p-4 text-left whitespace-normal break-words">
                <span className="font-bold">
                  {link.newLink?.split("/").pop()}
                </span>
              </div>
              <div className="col-span-1 p-4">
                <div
                  className="py-2 bg-violet-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-violet-700"
                  onClick={() => copyToClipboard(link.newLink)}
                >
                  Copy
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div
                  className="py-2 bg-red-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-red-700"
                  onClick={() => deleteLink(link._id)}
                >
                  Delete
                </div>
              </div>
              <div className="col-span-1 p-4 text-left">
                {formatDateTime(link.createdAt)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-100"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(links.length / itemsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(links.length / itemsPerPage)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Links;
