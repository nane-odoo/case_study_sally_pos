/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { onMounted } from "@odoo/owl";
import { WateringAlertPopup } from "./watering_alert_popup";

import { makeAwaitable } from "@point_of_sale/app/store/make_awaitable_dialog";

patch(PaymentScreen.prototype, {
    setup() {
        super.setup(...arguments);

        onMounted(() => {
            this._checkWateringStatusAndShowPopup();
        });
    },

    async _checkWateringStatusAndShowPopup() {
        const order = this.pos.get_order();

        const orderlines = order.get_orderlines();
        const productsNeedingWatering = [];
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
        const now = new Date();

        for (const line of orderlines) {
            const product = line.get_product();
            if (product?.last_watered_date) {
                const lastWateredUTCString = product.last_watered_date;
                const lastWateredUTC = new Date(
                    lastWateredUTCString.endsWith("Z")
                        ? lastWateredUTCString
                        : lastWateredUTCString + "Z"
                );

                if (isNaN(lastWateredUTC.getTime())) {
                    continue;
                }

                if (
                    now.getTime() - lastWateredUTC.getTime() >
                    twentyFourHoursInMs
                ) {
                    productsNeedingWatering.push(product.display_name);
                }
            }
        }

        if (productsNeedingWatering.length > 0) {
            const productNames = productsNeedingWatering.join(", ");
            const acknowledged = await makeAwaitable(
                this.dialog,
                WateringAlertPopup,
                {
                    title: _t("Watering Reminder"),
                    body: _t(
                        "The following flower(s) may need watering soon: %s. " +
                            "Please advise the customer to water them as soon as possible.",
                        productNames
                    ),
                }
            );
        }
    },
});
