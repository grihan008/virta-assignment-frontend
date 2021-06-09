import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../styles.css";

// Assume that data (if) provided by the API is correct
function StationListItem({ station }) {
  const available = station.connected && station.available;

  return (
    <Link
      to={{
        pathname: `/station/${station.station_ID}`,
        state: { fromHome: true }
      }}
      className="stationItem"
    >
      <p className="stationItem__text">{station.name}</p>
      <div className="stationItem__pill">
        {available ? (
          <>
            <img src="icons/icon_available.svg" alt="Station available icon" />
            <span>Available</span>
          </>
        ) : (
          <>
            <img src="icons/icon_offline.svg" alt="Station offline icon" />
            <span>Offline</span>
          </>
        )}
      </div>
    </Link>
  );
}

StationListItem.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    connected: PropTypes.number.isRequired,
    available: PropTypes.number.isRequired
  })
};

export default StationListItem;
