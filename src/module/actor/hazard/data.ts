import { SaveData } from "@actor/creature/data";
import {
    ActorSystemData,
    ActorSystemSource,
    ActorAttributes,
    BaseActorSourcePF2e,
    ActorTraitsSource,
    ActorAttributesSource,
    ActorHitPoints,
    InitiativeData,
} from "@actor/data/base";
import { ActorSizePF2e } from "@actor/data/size";
import { NPCStrike } from "@actor/npc";
import { SaveType } from "@actor/types";
import { Rarity, Size } from "@module/data";
import { HazardTrait } from "./types";

/** The stored source data of a hazard actor */
type HazardSource = BaseActorSourcePF2e<"hazard", HazardSystemSource>;

/** The raw information contained within the actor data object for hazards. */
interface HazardSystemSource extends ActorSystemSource {
    details: HazardDetailsSource;
    attributes: HazardAttributesSource;
    saves: HazardSaves;
    /** Traits, languages, and other information. */
    traits: HazardTraitsSource;
}

interface HazardAttributesSource extends ActorAttributesSource {
    ac: { value: number };
    hp: {
        value: number;
        max: number;
        temp: number;
        details: string;
    };
    perception?: never;
    initiative?: never;
    hardness: number;
    stealth: {
        value: number | null;
        details: string;
    };
    emitsSound: boolean | "encounter";
}

interface HazardSystemData extends Omit<HazardSystemSource, "attributes">, Omit<ActorSystemData, "traits"> {
    attributes: HazardAttributes;
    details: HazardDetails;
    traits: HazardTraitsData;
    actions: NPCStrike[];
}

interface HazardTraitsSource extends ActorTraitsSource<HazardTrait> {
    size: { value: Size };
    rarity: Rarity;
}

interface HazardTraitsData extends HazardTraitsSource {
    size: ActorSizePF2e;
    rarity: Rarity;
}

interface HazardAttributes
    extends Omit<HazardAttributesSource, "initiative" | "immunities" | "weaknesses" | "resistances">,
        Omit<ActorAttributes, "perception" | "shield"> {
    ac: {
        value: number;
    };
    hasHealth: boolean;
    hp: HazardHitPoints;
    hardness: number;
    initiative?: HazardInitiativeData;
    stealth: {
        value: number | null;
        details: string;
    };
    /**
     * Whether the hazard emits sound and can therefore be detected via hearing. A value of "encounter" indicates it is
     * silent until an encounter begins.
     */
    emitsSound: boolean | "encounter";

    shield?: never;
}

interface HazardInitiativeData extends InitiativeData {
    statistic: "stealth";
}

interface HazardDetailsSource {
    isComplex: boolean;
    level: { value: number };
    disable?: string;
    description?: string;
    reset?: string;
    routine?: string;
}

interface HazardDetails extends HazardDetailsSource {
    alliance: null;
}

interface HazardHitPoints extends ActorHitPoints {
    brokenThreshold: number;
}

type HazardSaves = Record<SaveType, SaveData>;

export { HazardSource, HazardSystemData };
