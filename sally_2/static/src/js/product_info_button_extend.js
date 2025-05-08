/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ProductInfoButton } from "@point_of_sale/app/screens/product_screen/product_info_button/product_info_button";
import { ProductInfoPopup } from "@point_of_sale/app/screens/product_screen/product_info_popup/product_info_popup"; // Import the standard popup
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

/*
 * Patch the ProductInfoButton:
 * - Remove the 'is_flower' check.
 * - Always fetch details using 'get_flower_details' RPC.
 * - Always pass the fetched data (or empty object) as 'flowerData' to the standard popup.
 */
patch(ProductInfoButton.prototype, {
    setup() {
        // Inherit original setup and get necessary services
        super.setup(...arguments);
        this.popup = useService("popup");
        this.orm = useService("orm");
        this.pos = useService("pos");
        this.notification = useService("notification");
        this.dialog = useService("dialog"); // Service to show the ProductInfoPopup
    },

    async onClick() {
        // Get selected line, show warning if none
        const orderline = this.pos.get_order()?.get_selected_orderline();
        if (!orderline) {
            this.notification.add(_t("Please select an order line first."), {
                type: "warning",
            });
            return;
        }

        const product = orderline.get_product();
        const quantity = 1; // Quantity needed for standard info calculation

        // --- Get standard product info first ---
        // This info (like cost, margin) might still be needed by the banner or other parts
        const info = await this.pos.getProductInfo(product, quantity);

        // --- ALWAYS Fetch detailed custom information via RPC ---
        // The backend Python method 'get_flower_details' should handle non-flowers gracefully.
        try {
            // Call the Python method on the backend
            const flowerData = await this.orm.call(
                // Ensure this model name is correct (product.product or product.template)
                "product.product",
                "get_flower_details", // Ensure this method name is correct
                [product.id] // Pass the product ID
            );

            // --- Add fetched data to the info object sent to the popup ---
            // The XML template will use 'info.flowerData'
            info.flowerData = flowerData || {}; // Use fetched data or an empty object if null/undefined

            // --- Show the standard ProductInfoPopup, passing the modified info object ---
            this.dialog.add(ProductInfoPopup, { info: info, product: product });
        } catch (error) {
            // Handle errors during the RPC call (e.g., network issue, server error)
            console.error("Failed to fetch custom product details:", error);
            this.popup.add("ErrorPopup", {
                title: _t("Error Loading Details"),
                body: _t(
                    "Could not load custom product details. Please check the connection or backend configuration."
                ),
            });
        }
    },
});
