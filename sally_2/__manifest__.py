{
    "name": "PSAE Sally POS", #Required
    "description": "Sally POS for flower shop",
    "author": "Odoo PS",
    "website": "https://www.odoo.com",
    "category": "POS",
    "version": "18.0.1.0.0",
    "license": "OEEL-1", #OPL-1
    "depends": ["point_of_sale"],
    "data": [
        "views/product_template.xml"
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "sally_2/static/src/xml/pos_product_info_popup_inherit.xml"
        ]
    },
}
