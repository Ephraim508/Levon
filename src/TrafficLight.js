import React, { useState, useEffect } from 'react';

const TrafficLight = () => {
  const [light, setLight] = useState('Green'); // Initial light
  const [pedestrianRequest, setPedestrianRequest] = useState(false); // To handle pedestrian request
  const [timer, setTimer] = useState(10); // Initial timer for Green light

  // Traffic light sequence timings
  const durations = {
    Green: 10,
    Yellow: 3,
    Red: 7,
  };

  // Function to handle pedestrian crossing request
  const handlePedestrianClick = () => {
    setPedestrianRequest(true);
  };

  // Function to manage light change based on current light and pedestrian request
  const changeLight = () => {
    if (light === 'Green') {
      setLight('Yellow');
      setTimer(durations.Yellow);
    } else if (light === 'Yellow') {
      setLight('Red');
      setTimer(durations.Red);
    } else if (light === 'Red') {
      // Check if pedestrian request was made
      if (pedestrianRequest) {
        setTimer(5); // Additional 5 seconds for pedestrian crossing
        setPedestrianRequest(false);
      } else {
        setLight('Green');
        setTimer(durations.Green);
      }
    }
  };

  // Use effect to handle timer countdown and light change
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          changeLight();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [light, pedestrianRequest]);

  return (
    <div>
      <h1>Traffic Light Control</h1>
      <div className="traffic-light">
        <div style={{ backgroundColor: light === 'Red' ? 'red' : '#555' }}>Red</div>
        <div style={{ backgroundColor: light === 'Yellow' ? 'yellow' : '#555' }}>Yellow</div>
        <div style={{ backgroundColor: light === 'Green' ? 'green' : '#555' }}>Green</div>
      </div>

      <p>Current Light: {light}</p>
      <p>Time Remaining: {timer} seconds</p>

      <button onClick={handlePedestrianClick} disabled={pedestrianRequest}
      className={`pedestrianRequest?"buttonenable":"buttondisable"`}>
        Pedestrian Crossing
      </button>
    </div>
  );
};

export default TrafficLight;
