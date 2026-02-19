import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows="4"
              />

              <button
                onClick={handleSave}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700">{userData.about}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 transition duration-300 font-medium"
              >
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default AboutSection;
