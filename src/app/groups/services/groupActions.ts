import { useQuery, useMutation, useQueryClient } from "react-query";
import { ObjectId } from "mongodb";
import { addGroup, fetchGroup, fetchUserGroups, fetchGroupRequests, fetchGroupImage, updateGroupProfile, joinGroup, createGroupProgram, fetchGroupPrograms } from "./groupServices";
import { GroupProfileType, GroupType } from "../types/groupTypes";
import { ProgramRequest } from "../models/Programs";

export const useAddGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: GroupType) => addGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      console.error("useAddGroup mutation error: ", error);
    },
  });
};

export const useUpdateGroupProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: GroupProfileType) => updateGroupProfile(group),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      console.error("useUpdateGroupProfile mutation error: ", error);
    },
  });
};

export const useFetchGroup = (groupId: ObjectId) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(groupId),
  });
};

export const useFetchUserGroups = (userId: string) => {
  return useQuery({
    queryKey: ["group", userId],
    queryFn: () => fetchUserGroups(userId),
  });
};

export const useFetchGroupRequests = (userId: ObjectId) => {
  return useQuery({
    queryKey: ["requests", userId],
    queryFn: () => fetchGroupRequests(userId),
  });
}

export const useFetchGroupImage = () => {
  return useQuery({
    queryKey: "groupImage",
    queryFn: () => fetchGroupImage(),
  });
}

export const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: ObjectId) => joinGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      console.error("useJoinGroupMutation error: ", error);
    },
  });
}

export const useCreateGroupProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, program }: { groupId: string, program: ProgramRequest }) => 
      createGroupProgram(groupId, program),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      console.error("useCreateGroupProgram mutation error: ", error);
    },
  });
}

export const useFetchGroupPrograms = (groupId: string) => {
  return useQuery({
    queryKey: ["group", groupId, "programs"],
    queryFn: () => fetchGroupPrograms(groupId),
  });
}
