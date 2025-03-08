import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// Generate activity data
const genActivityData = async (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  let end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 60);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

// Generate panel colors
const getPenalColor = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2001-01-01";
      const endDate = "2001-01-31";
      const data = await genActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      const colors = getPenalColor(maxCount);
      setPanelColors(colors);
    };

    fetchData();
  }, []);

  return (
    <div className="heat-map">
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatProfile lg:w-[50rem] lg:h-[50rem] md:w-[30rem] md:h-[30rem] sm:w-[18rem] sm:h-[18rem] w-[20rem] h-[20rem]"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={15}
        space={3}
        rectProps={{
          rx: 2.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;
