/** @odoo-module **/
import { registry } from "@web/core/registry";
import { PriceList } from "./price_list/price_list";

registry.category("actions").add("sally_flower_shop.dashboard", PriceList);
