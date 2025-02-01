import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import CreateEventForm from "../components/CreateEventForm";
import { useCreateEvent } from "../services/eventActions";
import { CreateEventRequest } from "../models/createEventRequest";

const CreateEventView: React.FC = () => {

  const safeAreaEdges: Edge[] = ['top', 'left', 'right'];
  const { mutate: createEvent, isLoading, error } = useCreateEvent();
  const handleSubmit = (eventData: CreateEventRequest) => { 
    createEvent(eventData); 
  };

  return (
    <SafeAreaView edges={safeAreaEdges} style={styles.container}>
      <CreateEventForm onSubmit={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});

export default CreateEventView;
