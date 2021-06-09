import React from "react";

import {
  useQuery,
  gql
} from "@apollo/client";

import StationListItem from "../components/StationListItem";
import Error from "../components/Error";
import Loading from "../components/Loading";

const STATIONS = gql`
  query GetStations {
    stations {
      station_ID
      name
      available
      connected
    }
  }
`;

function Home() {
  // Assume that there should not be thousands of items for every customer
  // Otherwise - pagination should be added
  const { loading, error, data, refetch } = useQuery(STATIONS);

  /**
   * Renders StationList or
   * Loader while data is loading or
   * Error when something goes wrong or
   * No stations message when there are no stations in the list
   */
     const renderList = () => {
      if (loading) {
        return <Loading />;
      } else if (error || !data) {
        return (
          <Error
            text="Something went wrong while loading data. Please try again."
            action={() => refetch()}
            actionText="Try Again"
          />
        );
      } else if (!data.stations.length) {
        return <h1>No stations</h1>;
      } else {
        return data.stations.map((station) => (
          <StationListItem key={station.station_ID} station={station} />
        ));
      }
    };

    return (
      <>
        <h1 className="heading">Your stations</h1>
        {renderList()}
      </>
    );
}

export default Home;
