# -*- coding: utf-8 -*-
{
    'name': "Sally Flower Shop List",
    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['web'],

    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'sally_1/static/src/**/*',
        ],
    },
    'license': 'AGPL-3'
}
