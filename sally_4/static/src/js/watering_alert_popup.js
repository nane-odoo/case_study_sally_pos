import { Component, onMounted, useRef, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class WateringAlertPopup extends Component {
    static template = "point_of_sale.WateringAlertPopup";
    static components = { Dialog };
    static props = {
        title: String,
        body: String,
        getPayload: Function,
        close: Function,
    };

    setup() {}

    confirm() {
        this.props.close();
    }
}
