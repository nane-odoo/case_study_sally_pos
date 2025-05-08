from odoo import _, api, fields, models
from odoo.exceptions import ValidationError


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    is_flower = fields.Boolean()

    common_name = fields.Char(required=True)
    scientific_name = fields.Char()
    season_start = fields.Date()
    season_end = fields.Date()

    watering_frequency = fields.Integer(string='Water Frequency (Days)')
    watering_amount = fields.Float(string='Watering Amount in (ml)', )

    last_watered_date = fields.Datetime(string="Last Watered Date", required=True)

    @api.constrains("is_flower", "common_name")
    def _check_common_name(self):
        for rec in self:
            if rec.is_flower and not rec.common_name:
                raise ValidationError("A flower must have a common name")

    def get_flower_details(self, product_id):
        product = self.browse(product_id)
        if not product:
            return None
        return {
            'id': product.id,
            'name': product.display_name,
            'common_name': product.common_name,
            'scientific_name': product.scientific_name,
            'season_start': product.season_start,
            'season_end': product.season_end,
            'watering_frequency': product.watering_frequency,
            'watering_amount': product.watering_amount,
            'last_watered_date': product.last_watered_date
        }
