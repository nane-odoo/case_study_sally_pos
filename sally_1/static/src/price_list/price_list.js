/** @odoo-module **/

import { Component, useState, useRef } from "@odoo/owl";
import { PriceLine } from "./price_line"; // Corrected path assuming sibling folder

export class PriceList extends Component {
    static template = "sally_flower_shop.PriceList";
    static components = { PriceLine };

    setup() {
        this.nextId = 1; // Changed from currId for clarity
        // Refs for the input fields
        this.nameInputRef = useRef("nameInput");
        this.priceInputRef = useRef("priceInput");

        // State for the list of lines
        this.state = useState({
            lines: [], // Start with an empty list
        });
    }

    // Method to add a new line using values from input refs
    addLine() {
        const nameInput = this.nameInputRef.el;
        const priceInput = this.priceInputRef.el;
        const name = nameInput.value.trim();
        // Parse price, default to 0 if invalid
        const price = parseFloat(priceInput.value) || 0;

        if (name === "") {
            alert("Please enter an item name."); // Simple validation
            return;
        }

        // Add the new item to the state
        this.state.lines.push({
            id: this.nextId++,
            name: name,
            price: price, // Add the price field
            isCompleted: false,
        });

        // Clear inputs and focus name input for next entry
        nameInput.value = "";
        priceInput.value = "";
        nameInput.focus();
    }

    // Method to toggle the completion status (Typo fixed)
    toggleLine(lineId) {
        const line = this.state.lines.find((l) => l.id === lineId);
        if (line) {
            // Check if found
            line.isCompleted = !line.isCompleted;
        }
    }

    // Method to remove a line
    removeLine(lineId) {
        const lineIndex = this.state.lines.findIndex((l) => l.id === lineId);
        if (lineIndex >= 0) {
            this.state.lines.splice(lineIndex, 1);
        }
    }

    // Note: If you need inline editing within PriceLine, you would add
    // updateLineName(lineId, newName) and updateLinePrice(lineId, newPrice) methods here
    // and pass them down as props to PriceLine.
}
