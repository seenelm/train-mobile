import { ProgramResponse } from "./Programs";

export interface GroupProgramsRequest {
    groupId: string;
    programs: string[];
}

export interface GroupProgramsResponse {
    data: ProgramResponse[];
}