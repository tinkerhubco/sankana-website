import React, { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import Pusher from 'pusher-js';
import axios from 'axios';

import { Box } from '@chakra-ui/react';

import { ENV_PUSHER_API_KEY, ENV_PUSHER_CLUSTER } from '../../constants/envs';

import { TomtomMap } from '../../components/TomtomMap';

const reduceParticipantCoordinates = (event) => {
  return event.participants.reduce((accumulator, currentValue) => {
    // Current location of the participant is the last location
    // in the locations array
    const { latitude, longitude } = [...currentValue.locations].pop();

    accumulator.push({
      latitude,
      longitude,
    });
    return accumulator;
  }, []);
};

export type EventDetailPageProps = {
  event: {
    code: string;
    destination: {
      latitude: number;
      longitude: number;
    },
    participants: {
      _id: string;
      user: any;
      locations: {
        latitude: number;
        longitude: number;
      }[];
    }[];
  };
};
const EventDetailPage = ({ event }: EventDetailPageProps) => {
  const [coordinates, setCoordinates] = useState(() =>
    reduceParticipantCoordinates(event)
  );

  console.log('coordinates', coordinates);

  useEffect(() => {
    if (!event.code) {
      return;
    }

    const pusher = new Pusher(ENV_PUSHER_API_KEY, {
      cluster: ENV_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(event.code);
    channel.bind('event:participant-join', (newEvent) => {
      setCoordinates(reduceParticipantCoordinates(newEvent));
    });
    return () => channel.cancelSubscription();
  }, [event.code]);

  return (
    <Box height="100%">
      <TomtomMap coordinates={[
        {
          ...event.destination,
          markerSrc: 'https://img.pokemondb.net/sprites/bank/shiny/bulbasaur.png',
        },
        ...coordinates,
      ]} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { code } = query;

  const { data: event } = await axios.get(`api/events/${code}`, {
    baseURL: 'http://localhost:4200',
  });

  return {
    props: {
      event,
    },
  };
};

export default EventDetailPage;
