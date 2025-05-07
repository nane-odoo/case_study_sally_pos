{
    "name": "PSAE Sally Addons", #Required
    "description": "Sally POS flower item addons",
    "author": "Odoo PS",
    "website": "https://www.odoo.com",
    "category": "POS",
    "version": "18.0.1.0.0",
    "license": "OEEL-1", #OPL-1
    "depends": ["point_of_sale", "base"],
    "data": [
        "security/ir.model.access.csv",
        "views/flower_addon_views.xml",
        "views/flower_addon_menus.xml",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "sally_3/static/src/**/*"
        ]
    },
    "installable": True,
    "application": False,
}
