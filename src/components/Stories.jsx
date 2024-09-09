import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState({ name: "", short_description: "" });

  // Get the token from localStorage
  const token = localStorage.getItem("token");
  // Axios configuration with JWT token in the headers
  const axiosConfig = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };
  // Fetch stories from the API
  useEffect(() => {
    axios.get(`${API_URL}/stories`, axiosConfig)
      .then(response => {
        setStories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the stories!", error);
        setLoading(false);
      });
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    setNewStory({
      ...newStory,
      [e.target.name]: e.target.value
    });
  };

  // Function to create a new story
  const handleCreateStory = () => {
    axios.post(`${API_URL}/stories`, newStory, axiosConfig)
      .then(response => {
        setStories([...stories, response.data]);
        setIsModalOpen(false);
        setNewStory({ name: "", short_description: "", status: "draft" });
      })
      .catch(error => {
        console.error("There was an error creating the story!", error);
      });
  };

  // Function to toggle modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Stories</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Story
        </button>
      </div>

      {loading ? (
        <p>Loading stories...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold">{story.name}</h2>
              <p className="text-gray-700">{story.short_description}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 rounded ${
                  story.status === "published"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {story.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal for creating a new story */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Create New Story
                </h3>

                <div className="mt-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Story Name"
                    value={newStory.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mt-4">
                  <textarea
                    name="short_description"
                    placeholder="Short Description"
                    value={newStory.short_description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={toggleModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateStory}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;