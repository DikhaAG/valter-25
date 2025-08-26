import {
   classRegistraionTable,
   ClassRegistrationTable,
   participantTable,
   ParticipantTable,
} from "@/models/seminar/table";

type data = ParticipantTable | ClassRegistrationTable;
export function isSeminarParticipantsTable(data: data): boolean {
   return participantTable.safeParse(data).success;
}

export function isSeminarClassTable(data: data): boolean {
   return classRegistraionTable.safeParse(data).success;
}
