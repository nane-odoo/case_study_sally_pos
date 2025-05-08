# In a file like sally_addons/models/pos_session.py

from odoo import models, api

class PosSession(models.Model):
    _inherit = 'pos.session'

    @api.model
    def _load_pos_data_models(self, config_id):
        return super()._load_pos_data_models(config_id) + ["sally_addons.flower_addon"]
