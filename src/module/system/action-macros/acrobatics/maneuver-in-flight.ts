import { ActionMacroHelpers, SkillActionOptions } from "..";
import { SingleCheckAction } from "@actor/actions";

const PREFIX = "PF2E.Actions.ManeuverInFlight";

function maneuverInFlight(options: SkillActionOptions) {
    const slug = options?.skill ?? "acrobatics";
    const rollOptions = ["action:maneuver-in-flight"];
    const modifiers = options?.modifiers;
    return ActionMacroHelpers.simpleRollActionCheck({
        actors: options.actors,
        actionGlyph: options.glyph ?? "A",
        title: `${PREFIX}.Title`,
        checkContext: (opts) => ActionMacroHelpers.defaultCheckContext(opts, { modifiers, rollOptions, slug }),
        traits: ["move"],
        event: options.event,
        callback: options.callback,
        difficultyClass: options.difficultyClass,
        extraNotes: (selector: string) => [
            ActionMacroHelpers.outcomesNote(selector, `${PREFIX}.Notes.success`, ["success", "criticalSuccess"]),
            ActionMacroHelpers.note(selector, PREFIX, "failure"),
            ActionMacroHelpers.note(selector, PREFIX, "criticalFailure"),
        ],
    });
}

const action = new SingleCheckAction({
    cost: 1,
    description: `${PREFIX}.Description`,
    name: `${PREFIX}.Title`,
    notes: [
        { outcome: ["success", "criticalSuccess"], text: `${PREFIX}.Notes.success` },
        { outcome: ["failure"], text: `${PREFIX}.Notes.failure` },
        { outcome: ["criticalFailure"], text: `${PREFIX}.Notes.criticalFailure` },
    ],
    rollOptions: ["action:maneuver-in-flight"],
    slug: "maneuver-in-flight",
    statistic: "acrobatics",
    traits: ["move"],
});

export { maneuverInFlight as legacy, action };
