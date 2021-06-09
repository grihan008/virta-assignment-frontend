import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  useQuery,
  gql
} from "@apollo/client";

import Error from "../components/Error";

const STATION = gql`
  query GetStation($id: Int!) {
    station(id: $id) {
      name
      available
      connected
      status
      seller_ID
      sockets
      maxpower
      currency
    }
  }
`;

function Station() {
  const { id } = useParams();
  const history = useHistory();
  // Check if coming from home page (to set back button behaviour)
  const location = useLocation();
  const state = location?.state;
  const fromHome = state ? state.fromHome : false;
  const { loading, error, data } = useQuery(STATION, {
    variables: {
      id: +id
    }
  });

  const handleClickBack = (e) => {
    e.preventDefault();
    if (!fromHome) {
      history.replace("/");
    } else {
      history.goBack();
    }
  };

  const renderContent = () => {
    if (loading) return null;
    if (error || !data) return (
      <Error
        text="Oops! Nothing to see here! Please select a station on the home page"
        action={handleClickBack}
        actionText="Go to Homepage"
      />
    );

    return (
      <div className="stationDetails">
        {/* Should be some design and proper layout here rather then just listing Object's properties */}
        {Object.entries(data.station).map(([key, value]) => key !== "__typename" ? (
          <div key={key} className="stationDetail">
            <p className="stationDetail__label">{key}</p>
            <p>{value}</p>
          </div>
        ) : null)}
      </div>
    );
  }

  // Assume that data (if) provided by the API is correct

  // Landing on a station page before selecting a station shows an error
  // This behaviour is for assignment only. Station id should be passed with url params
  // and data should be loaded on this page, ideally.
  return (
    <>
      <div className="stationHeader">
        <a
          href="/"
          onClick={handleClickBack}
          className="stationHeader__back"
        >
          <img
            src="/icons/icon_arrow--left.svg"
            alt="Back button arrow icon"
          />
        </a>
        <h1>{(loading && 'Loading') || (data?.station?.name || '404')}</h1>
      </div>
      {renderContent()}
    </>
  );
}

export default Station;
