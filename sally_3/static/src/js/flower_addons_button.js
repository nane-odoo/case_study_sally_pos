/** @odoo-module **/

import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { SelectionPopup } from "@point_of_sale/app/utils/input_popups/selection_popup";
import { makeAwaitable } from "@point_of_sale/app/store/make_awaitable_dialog";

export class FlowerAddonsButton extends Component {
    static template = "sally_addons.FlowerAddonsButton";

    static props = {
        getter: { type: Function, optional: true },
        setter: { type: Function, optional: true },
    };

    setup() {
        this.pos = usePos();
        this.dialog = useService("dialog");
        this.available_addons =
            this.pos.models?.["sally_addons.flower_addon"]?.getAll() || [];
    }

    async onClick() {
        const selectedOrderline = this.pos.get_order().get_selected_orderline();
        //Get curr selected add-ons
        let currentAddonIds = this.props.getter(selectedOrderline);

        //Get all available add-ons
        const addonList = this.available_addons.map((addon) => ({
            id: addon.id,
            label: `${addon.name} (+$${addon.price})`,
            item: addon,
            isSelected: currentAddonIds.includes(addon.id),
        }));

        const payload = await this.openAddonsInput(addonList);

        if (payload) {
            const newSelectedAddonId = payload.id;
            let finalAddonIds;

            if (currentAddonIds.includes(newSelectedAddonId)) {
                finalAddonIds = currentAddonIds.filter(
                    (id) => id !== newSelectedAddonId
                );
            } else {
                finalAddonIds = [...currentAddonIds, newSelectedAddonId];
            }
            this.props.setter(selectedOrderline, finalAddonIds);

            const product = selectedOrderline.get_product();
            const currentOrder = this.pos.get_order();
            const basePrice = product.get_price(
                currentOrder.pricelist_id,
                selectedOrderline.get_quantity()
            );

            let newTotalPrice = basePrice;
            currentAddonIds = this.props.getter(selectedOrderline);
            for (const addonId of currentAddonIds) {
                const addonDetails = this.available_addons.find(
                    (a) => a.id === addonId
                );

                newTotalPrice += addonDetails.price;
            }

            selectedOrderline.set_unit_price(newTotalPrice);
        }
    }

    async openAddonsInput(addonList) {
        return await makeAwaitable(this.dialog, SelectionPopup, {
            title: "Select Addons",
            list: addonList,
        });
    }
}
