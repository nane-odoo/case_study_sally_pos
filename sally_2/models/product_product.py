from odoo import _, api, fields, models


class ProductProduct(models.Model):
    _inherit = 'product.product'

    @api.model
    def _load_pos_data_fields(self, config_id):
        return return super()._load_pos_data_fields(config_id) + ['is_flower', 'common_name',
            'scientific_name', 'season_start', 'season_end',
            'watering_frequency', 'watering_amount', 'last_watered_date']
