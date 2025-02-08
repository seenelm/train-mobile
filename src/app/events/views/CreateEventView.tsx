import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import CreateEventForm from "../components/CreateEventForm";
import { useCreateEvent } from "../services/eventActions";
import { EventRequest } from "../models/eventModel";
import { useSelector } from "react-redux";
import { selectUser } from "../../../services/authSlice";
import { EventProvider } from "../context/EventContext";

const CreateEventView: React.FC = () => {
  const safeAreaEdges: Edge[] = ['top', 'left', 'right'];
  const { mutate: createEvent } = useCreateEvent();
  const userId = useSelector(selectUser);

  const handleSubmit = (eventData: EventRequest) => { 
    createEvent(eventData); 
  };

  return (
    <EventProvider userId={userId}>
      <SafeAreaView edges={safeAreaEdges} style={styles.container}>
        <CreateEventForm onSubmit={handleSubmit} />
      </SafeAreaView>
    </EventProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});

export default CreateEventView;