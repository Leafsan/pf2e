import { ActionMacroHelpers, SkillActionOptions } from "..";
import { SingleCheckAction } from "@actor/actions";

const PREFIX = "PF2E.Actions.Squeeze";

function squeeze(options: SkillActionOptions) {
    const slug = options?.skill ?? "acrobatics";
    const rollOptions = ["action:squeeze"];
    const modifiers = options?.modifiers;
    ActionMacroHelpers.simpleRollActionCheck({
        actors: options.actors,
        actionGlyph: options.glyph,
        title: `${PREFIX}.Title`,
        checkContext: (opts) => ActionMacroHelpers.defaultCheckContext(opts, { modifiers, rollOptions, slug }),
        traits: ["exploration", "move"],
        event: options.event,
        callback: options.callback,
        difficultyClass: options.difficultyClass,
        extraNotes: (selector: string) => [
            ActionMacroHelpers.note(selector, "PF2E.Actions.Squeeze", "criticalSuccess"),
            ActionMacroHelpers.note(selector, "PF2E.Actions.Squeeze", "success"),
            ActionMacroHelpers.note(selector, "PF2E.Actions.Squeeze", "criticalFailure"),
        ],
    });
}

const action = new SingleCheckAction({
    description: `${PREFIX}.Description`,
    name: `${PREFIX}.Title`,
    notes: [
        { outcome: ["criticalSuccess"], text: `${PREFIX}.Notes.criticalSuccess` },
        { outcome: ["success"], text: `${PREFIX}.Notes.success` },
        { outcome: ["criticalFailure"], text: `${PREFIX}.Notes.criticalFailure` },
    ],
    rollOptions: ["action:squeeze"],
    slug: "squeeze",
    statistic: "acrobatics",
    traits: ["exploration", "move"],
});

export { squeeze as legacy, action };
