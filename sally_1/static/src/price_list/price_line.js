/** @odoo-module **/

import { Component } from "@odoo/owl";

export class PriceLine extends Component {
    static template = "sally_flower_shop.PriceLine";
    // Props expected from PriceList parent
    static props = {
        priceLine: {
            // Object containing data for this line
            type: Object,
            shape: {
                id: Number,
                name: String,
                price: Number,
                isCompleted: Boolean,
            },
        },
        // Functions passed from parent
        toggleState: { type: Function },
        removeLine: { type: Function },
        // We don't need update functions here if inputs are directly in parent for adding
        // If you wanted inline editing, you'd add updateName/updatePrice props here too
    };

    // Method called when the checkbox state changes
    onChange() {
        this.props.toggleState(this.props.priceLine.id);
    }

    // Method called when the remove icon is clicked
    onRemove() {
        this.props.removeLine(this.props.priceLine.id);
    }
}
