import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import from react-redux
import { toggleEmergency, togglePedestrian } from './store'; // Import actions

const Traffic = () => {
    const [light, setLight] = useState('Green'); // Initial light
    const [timer, setTimer] = useState(10); // Initial timer for Green light

    const dispatch = useDispatch();

    // Fetch durations and request states from Redux store
    const durations = useSelector((state) => ({
        Green: state.Green,
        Yellow: state.Yellow,
        Red: state.Red,
    }));

    const emergency = useSelector((state) => state.emergency); // Get emergency state from store
    const pedestrianRequest = useSelector((state) => state.pedestrianRequest); // Get pedestrian request state from store

    // Function to handle pedestrian crossing request
    const handlePedestrianClick = () => {
        dispatch(togglePedestrian(true)); // Dispatch action to toggle pedestrian request
    };

    // Function to handle emergency vehicle override
    const handleEmergencyClick = () => {
        dispatch(toggleEmergency(true)); // Dispatch action to toggle emergency
        setLight('Green');
        setTimer(durations.Green);
    };

    // Function to manage light change based on current light and pedestrian/emergency requests
    const changeLight = () => {
        if (emergency) {
            dispatch(toggleEmergency(false)); // Reset emergency after one cycle
            setLight('Green');
            setTimer(durations.Green);
        } else if (light === 'Green') {
            setLight('Yellow');
            setTimer(durations.Yellow);
        } else if (light === 'Yellow') {
            setLight('Red');
            setTimer(durations.Red);
        } else if (light === 'Red') {
            if (pedestrianRequest) {
                setTimer(5); // Additional 5 seconds for pedestrian crossing
                dispatch(togglePedestrian(false)); // Reset pedestrian request
            } else {
                setLight('Green');
                setTimer(durations.Green);
            }
        }
    };

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
    }, [light, emergency, pedestrianRequest]);

    return (
        <div className="traffic-container">
            <div className='traffic-image'>
                <div className='traffic-light'>
                    <div className='light' style={{ backgroundColor: light === 'Red' ? 'red' : 'black' }}>
                        {light === "Red" ? timer : null}
                    </div>
                    <div className='light' style={{ backgroundColor: light === 'Yellow' ? 'yellow' : 'black' }}>
                        {light === "Yellow" ? timer : null}
                    </div>
                    <div className='light' style={{ backgroundColor: light === 'Green' ? 'green' : 'black' }}>
                        {light === "Green" ? timer : null}
                    </div>
                </div>
            </div>

            <div className='right-part'>
                <div className='pedestrain-crossing'>
                    <h1 className='pheading'>Pedestrian Crossing is: <span>{pedestrianRequest ? "ON" : "OFF"}</span></h1>
                    <button
                        className={pedestrianRequest ? "buttondisable" : "buttonenable"}
                        onClick={handlePedestrianClick}
                        disabled={pedestrianRequest || emergency}
                    >
                        Pedestrian
                    </button>
                </div>

                <div>
                    <h1 className='pheading'>Emergency Override: <span>{emergency ? "ACTIVE" : "INACTIVE"}</span></h1>
                    <button
                        className={emergency ? "buttondisable" : "buttonenable"}
                        onClick={handleEmergencyClick}
                        disabled={emergency}
                    >
                        Emergency Vehicle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Traffic;
