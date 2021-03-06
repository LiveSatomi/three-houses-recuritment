/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Character id
 */
export type CharacterId = "ashe" | "felix" | "lysithea" | "raphael";
/**
 * Name of gift
 */
export type GiftId =
    | "ancient-coin"
    | "arithmetic-textbook"
    | "armored-bear-stuffy"
    | "blue-cheese"
    | "book-of-crest-designs"
    | "ceremonial-sword"
    | "exotic-spices"
    | "hunting-dagger"
    | "legends-of-chivalry"
    | "lily"
    | "smoked-meat"
    | "tasty-baked-treat"
    | "training-weight"
    | "violet"
    | "whetstone"
    | "riding-boots"
    | "owl-feather"
    | "watering-can"
    | "fishing-float"
    | "floral-adornment"
    | "landscape-painting"
    | "goddess-statuette"
    | "gemstone-beads"
    | "stylish-hair-clip";
/**
 * ID of lost item
 */
export type LostItemId =
    | "encyclopediaOfSweets"
    | "princessDoll"
    | "newBottleOfPerfume"
    | "moonKnightsTale"
    | "evilRepellingAmulet"
    | "bundleOfHerbs"
    | "blackIronSpur"
    | "swordBeltFragment"
    | "toothedDagger"
    | "woodenButton"
    | "burlapSackOfRocks"
    | "bigSpoon";
/**
 * Name of meal
 */
export type MealId = "peachSorbet" | "friedCrayfish";

/**
 * Fire Emblem Character Schema
 */
export interface Character {
    _id: CharacterId;
    /**
     * Character Name
     */
    name: string;
    /**
     * URL for the character portrait, relative to src
     */
    portraitUrl: string;
    /**
     * List of liked gifts
     */
    gifts: GiftId[];
    /**
     * List of liked gifts
     */
    lostItems: LostItemId[];
    /**
     * Lists of liked and disliked meals
     */
    meals: {
        liked: MealId[];
        disliked: MealId[];
    };
    /**
     * Indicates whether the Choir Practice activity is liked or disliked
     */
    choir: "like" | "dislike" | "";
    /**
     * Indicates whether the Cooking Together activity is liked or disliked
     */
    cooking: "like" | "dislike" | "";
    /**
     * Route specific information for the character
     */
    routes: {
        id: "white-clouds" | "silver-snow" | "crimson-flower" | "azure-moon" | "verdant-wind";
        chapters: {
            available: boolean;
        }[];
    }[];
}
