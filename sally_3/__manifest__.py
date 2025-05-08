{
    "name": "PSAE Sally Addons", #Required
    "description": "Sally POS flower item addons",
    "author": "Odoo PS",
    "website": "https://www.odoo.com",
    "category": "POS",
    "version": "18.0.1.0.0",
    "license": "OEEL-1", #OPL-1
    "depends": ["point_of_sale"],
    "data": [
        "security/ir.model.access.csv",
        "views/flower_addon_views.xml",
        "views/flower_addon_menus.xml",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "sally_3/static/src/js/control_buttons_extend.js",
            "sally_3/static/src/js/flower_addons_button.js",
            "sally_3/static/src/js/pos_order_line_extend.js",
            "sally_3/static/src/xml/control_buttons_extend.xml",
            "sally_3/static/src/xml/flower_addons_button.xml",
            "sally_3/static/src/xml/orderline_extend.xml",
        ]
    },
}
