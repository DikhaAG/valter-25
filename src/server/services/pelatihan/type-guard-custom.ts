import {
   classRegistraionTable,
   ClassRegistrationTable,
   participantTable,
   ParticipantTable,
} from "@/models/pelatihan/table";

type data = ParticipantTable | ClassRegistrationTable;
export function isPelatihanParticipantsTable(data: data): boolean {
   return participantTable.safeParse(data).success;
}

export function isPelatihanClassTable(data: data): boolean {
   return classRegistraionTable.safeParse(data).success;
}
