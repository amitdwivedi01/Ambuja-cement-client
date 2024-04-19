import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Leaderboard = ({host}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [leaderboardType, setLeaderboardType] = useState("snap-score"); // Default to snap-score

  useEffect(() => {
    // Fetch the leaderboard data when the component mounts
    fetchLeaderboard(leaderboardType);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const fetchLeaderboard = async (sortBy) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${host}/api/users/sort-by-${sortBy}`
      );
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
      Email: user.email,
      Snap_Score: user.snapScore,
      Quiz_Score: user.quizScore.score,
      Time_Taken_seconds: user.quizScore.timeTaken,
      videoUrl:user.videoUrl,
      imageUrl:user.imageUrl
    }));
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = `leaderboard_${leaderboardType}${fileExtension}`;
    saveAs(data, fileName);
  };

  return (
    <div className="leaderboard-container h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-md w-full relative">
        
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
                <th className="px-4 py-2">Email</th>
                {leaderboardType === "snap-score" && (
                  <th className="px-4 py-2">Snap Score</th>
                )}
                {leaderboardType === "quiz-score" && (
                  <th className="px-4 py-2">Quiz Score</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.region}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  {leaderboardType === "snap-score" && (
                    <td className="border px-4 py-2">{user.snapScore}</td>
                  )}
                  {leaderboardType === "quiz-score" && (
                    <td className="border px-4 py-2">
                      {user.quizScore?.score} (Time Taken:{" "}
                      {user.quizScore?.timeTaken} seconds)
                    </td>
                  )}
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
