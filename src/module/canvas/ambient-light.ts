import { AmbientLightDocumentPF2e } from "@module/scene";
import { LightingLayerPF2e } from ".";

class AmbientLightPF2e<
    TParent extends AmbientLightDocumentPF2e = AmbientLightDocumentPF2e
> extends AmbientLight<TParent> {
    /** Is this light actually a source of darkness? */
    get isDarkness(): boolean {
        return this.source.isDarkness;
    }
}

interface AmbientLightPF2e<TParent extends AmbientLightDocumentPF2e = AmbientLightDocumentPF2e>
    extends AmbientLight<TParent> {
    get layer(): LightingLayerPF2e<this>;
}

export { AmbientLightPF2e };
