import OccurrenceData from "data/types/OccurrenceData";
import MerchantData from "data/types/MerchantData";
import QuestData from "data/types/QuestData";
import ChoirData from "data/types/ChoirData";
import CookingData from "data/types/CookingData";
import InstructionData from "data/types/InstructionData";
import ShareMealData from "data/types/ShareMealData";

// TODO somehow invert dependency on this making OccurrenceData implement OccurrenceFactory and injecting all the OccurrenceData classes to a list in this class
export default class OccurrenceFactory {
    static cloneOccurrenceData(data: OccurrenceData) {
        let castData;
        switch (data.type) {
            case "InstructionData":
                castData = data as InstructionData;
                return new InstructionData(castData.effectiveness, castData.count);
            case "MerchantData":
                castData = data as MerchantData;
                return new MerchantData(castData.merchant, castData.gift);
            case "QuestData":
                castData = data as QuestData;
                return new QuestData(castData.quest, castData.gift);
            case "choir-practice":
                castData = data as ChoirData;
                return new ChoirData();
            case "share-a-meal":
                castData = data as ShareMealData;
                return new ShareMealData(castData.meal);
            case "cooking-together":
                castData = data as CookingData;
                return new CookingData();
            default:
                throw new Error(data.type + " does not have an OccurrenceFactory");
        }
    }
}
