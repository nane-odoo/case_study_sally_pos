from odoo import _, api, fields, models
from odoo.osv import expression


class PosConfig(models.Model):
    _inherit = 'pos.config'

    def _get_available_product_domain(self):
        original_domain = super()._get_available_product_domain()
        flower_filter = [('is_flower', '=', True)]
        final_domain = expression.AND([original_domain, flower_filter])

        return final_domain
