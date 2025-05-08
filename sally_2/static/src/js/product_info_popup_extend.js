import { patch } from "@web/core/utils/patch";
import { ProductInfoPopup } from "@point_of_sale/app/screens/product_screen/product_info_popup/product_info_popup"; // Import the standard popup
import { _t } from "@web/core/l10n/translation";
/*
 * Patch the standard ProductInfoPopup component:
 * - Ensure it correctly receives and stores the 'flowerData' from the props.
 * - This makes 'this.flowerData' available for use in the XML template.
 */
patch(ProductInfoPopup.prototype, {
    setup() {
        // Inherit original setup
        super.setup(...arguments);
        // Store the flower data passed in props.info into a component property
        // Default to an empty object if it's not provided for some reason
        this.flowerData = this.props.info?.flowerData ?? {};
    },
    // No need to patch other methods like _hasMarginsCostsAccessRights unless
    // your custom display depends on them.
});
