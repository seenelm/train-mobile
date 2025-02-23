import React from "react";
import CreateEventView from "./CreateEventView";
import EventOverview from "./EventOverview";
import { EventProvider } from "../context/EventContext";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { useRoute } from '@react-navigation/native';
import { UserEventResponse } from "../models/eventModel";

export interface EventCRUDViewNavigationData {
    mode: string;
    userEventResponse?: UserEventResponse;
}

const EventCRUDView = () => {
  const route = useRoute();
  const { data } = route.params as { data: EventCRUDViewNavigationData };
  const userId = useSelector(selectUser);

  return (
    <EventProvider userId={userId}>
      <View style={{ flex: 1 }}>
        {data.mode === "create" && <CreateEventView />}
        {data.mode === "view" && data.userEventResponse && <EventOverview userEventResponse={data.userEventResponse}/>}
      </View>
    </EventProvider>
  );
};

export default EventCRUDView;
