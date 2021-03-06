import Occurrence from "../data/types/Occurrence";
import OccurrenceData from "../data/types/OccurrenceData";
import { CharacterId } from "../data/types/schemas/characterSchema";

export default interface OccurrenceScalar {
    calculate(character: CharacterId, occurrences: Occurrence<OccurrenceData>[]): Promise<number>;
}
