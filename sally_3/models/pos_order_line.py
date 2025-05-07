from odoo import _, api, fields, models

class PosOrderLine(models.Model):
    _inherit ="pos.order.line"

    flower_addons_ids = fields.Many2many("sally_addons.flower_addon", string="Flower Add-ons")

    def _load_pos_data_fields(self, config_id):
        res = super()._load_pos_data_fields(config_id)
        res.append('flower_addons_ids')
        return res
