# -*- coding: utf-8 -*-

from odoo import models, fields, api

class FlowerAddon(models.Model):
    """
    Represents an add-on that can be applied to a flower product in POS.
    """
    _name = 'sally_addons.flower_addon'
    _description = 'Flower Add-On'

    name = fields.Char(string="Add-On Name", required=True)
    price = fields.Float(string="Price", required=True)
    
    _sql_constraints = [
        ("unique_name", "UNIQUE(name)", "An addon with this name already exists!"),
        ("valid_price", "CHECK(price >= 0)", "The given price must be positive!")
    ]

    def _load_pos_data(self, data):
        domain = []
        fields = self._load_pos_data_fields()
        data = self.search_read(domain, fields, load=False)
        return {
            'data': data,
            'fields': fields,
        }

    @api.model
    def _load_pos_data_fields(self):
        return ['name', 'price']
    