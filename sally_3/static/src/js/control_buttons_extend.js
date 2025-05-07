import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { FlowerAddonsButton } from "./flower_addons_button";
import { patch } from "@web/core/utils/patch";

patch(ControlButtons.prototype, {});

patch(ControlButtons, {
    components: {
        ...ControlButtons.components,
        FlowerAddonsButton,
    },
});
