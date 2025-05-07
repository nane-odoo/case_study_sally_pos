import { patch } from "@web/core/utils/patch";
import { PosOrderline } from "@point_of_sale/app/models/pos_order_line";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";

patch(PosOrderline.prototype, {
    get_flower_addons() {
        return this.flower_addons_ids;
    },
    set_flower_addons(addon_ids) {
        this.flower_addons_ids = Array.isArray(addon_ids) ? addon_ids : [];
        this.setDirty();
        console.log("Setter =>", this);
    },
    //TODO1 : Need to save changes when adding addon -> array in JS need to be converted to m2m python to save it properly
    getDisplayData() {
        let finalStr = "";
        if (this.flower_addons_ids.length > 0) {
            const allAddons = this.models["sally_addons.flower_addon"].getAll();
            const selectedAddonNames = this.flower_addons_ids.map((id) => {
                const addon = allAddons.find((a) => a.id === id);
                return addon ? addon.name : null;
            });
            finalStr = selectedAddonNames.join(", ");
        }
        return {
            ...super.getDisplayData(),
            flowerAddons: finalStr,
        };
    },
});

patch(Orderline, {
    props: {
        ...Orderline.props,
        line: {
            ...Orderline.props.line,
            shape: {
                ...Orderline.props.line.shape,
                flowerAddons: {
                    type: String,
                    optional: true,
                },
            },
        },
    },
});
