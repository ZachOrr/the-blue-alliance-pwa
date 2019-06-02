import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  getYearEventsFetchStatus,
  getYearEvents
} from "../selectors/EventSelectors";
import { fetchYearEvents } from "../actions";
import useData from "../lib/useData";
import Head from "../components/Head";

const Events = ({ year, refetchOnLoad }) => {
  const [events, eventsFetchStatus, refetchEvents] = useData(
    state => getYearEventsFetchStatus(state, year),
    state => getYearEvents(state, year),
    fetchYearEvents(year),
    refetchOnLoad.events
  );

  return (
    <div>
      <Head title={`${year} Events`} />
      <h1>{year} Events</h1>
      <button onClick={refetchEvents}>Refetch</button>
      <div>{eventsFetchStatus}</div>
      <Link href="/">
        <a>Home</a>
      </Link>
      {events.map(event => (
        <div key={event.key}>
          <Link
            href={`/event?eventKey=${event.key}`}
            as={`/event/${event.key}`}
          >
            <a>
              {event.year} {event.safeShortName()}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

Events.getInitialProps = async ({ reduxStore, query }) => {
  const year = parseInt(query.year, 10) || 2019;
  const state = reduxStore.getState();

  const eventsFetchInitial =
    getYearEventsFetchStatus(state, year) !== "success";

  const fetchPromises = [];
  if (eventsFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchYearEvents(year)));
  }
  await Promise.all(fetchPromises);

  return {
    year,
    refetchOnLoad: {
      events: !eventsFetchInitial
    }
  };
};

Events.propTypes = {
  year: PropTypes.number,
  refetchOnLoad: PropTypes.object
};

export default Events;
