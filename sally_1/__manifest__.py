# -*- coding: utf-8 -*-
{
    'name': "PSAE Sally Flower Shop List",
    'author': "Odoo PS",
    'website': "https://www.odoo.com/",
    'version': '18.0.1.0.0',
    'application': True,
    'depends': ['web'],

    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'sally_1/static/src/**/*',
        ],
    },
    'license': 'OEEL-1'
}
