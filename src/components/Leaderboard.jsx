// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Define the Leaderboard component
const Leaderboard = ({ host }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [leaderboardType, setLeaderboardType] = useState("snap-score"); // Default to snap-score

  useEffect(() => {
    // Fetch the leaderboard data when the component mounts
    fetchLeaderboard(leaderboardType);
  }, [leaderboardType]); // Fetch new leaderboard when leaderboardType changes

  const fetchLeaderboard = async (sortBy) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${host}/api/users/sort-by-${sortBy}`);
      setUsers(response.data);
      setLeaderboardType(sortBy);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const formattedData = users.map((user) => ({
      Name: user.name,
      Region: user.region,
      Number: user.number,
      Snap_Score: user.snapScore,
      Quiz_Score: user.quizScore?.score,
      Time_Taken_seconds: user.quizScore?.timeTaken,
      feedback: user.quizScore?.userComment,
      laybhari: user.videoUrl,
      numer_one: user.imageUrl,
      banega_toh_badega: user.imageorvideo,
    }));
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = `leaderboard_${leaderboardType}${fileExtension}`;
    saveAs(data, fileName);
  };

  return (
    <div className="leaderboard-container h-screen bg-gray-100 flex flex-col items-center ">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => fetchLeaderboard("snap-score")}
            className={` hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              leaderboardType === "snap-score" ? "bg-blue-400" : "bg-blue-700"
            }`}
          >
            Snap Score Leaderboard
          </button>
          <button
            onClick={() => fetchLeaderboard("quiz-score")}
            className={` hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              leaderboardType === "quiz-score" ? "bg-blue-400" : "bg-blue-700"
            }`}
          >
            Quiz Score Leaderboard
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Export to Excel
          </button>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {users.length > 0 && (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Region</th>
                <th className="px-4 py-2">Number</th>
                {leaderboardType === "snap-score" && (
                  <th className="px-4 py-2">Snap Score</th>
                )}
                {leaderboardType === "quiz-score" && (
                  <th className="px-4 py-2">Quiz Score</th>
                )}
                <th className="px-4 py-2">Laybhari</th>
                <th className="px-4 py-2">Numer One</th>
                <th className="px-4 py-2">Banega Toh Badega</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.region}</td>
                  <td className="border px-4 py-2">{user.number}</td>
                  {leaderboardType === "snap-score" && (
                    <td className="border px-4 py-2">{user.snapScore}</td>
                  )}
                  {leaderboardType === "quiz-score" && (
                    <td className="border px-4 py-2">
                      {user.quizScore?.score} (Time Taken:{" "}
                      {user.quizScore?.timeTaken} seconds)
                    </td>
                  )}
                  <td className="border px-4 py-2">
                    {user.videoUrl && (
                      <video controls width="200">
                        <source src={user.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {user.imageUrl && (
                      <img src={user.imageUrl} alt="Image" width="100" />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {user.imageorvideo && (
                      <img src={user.imageorvideo} alt="Image" width="100" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
