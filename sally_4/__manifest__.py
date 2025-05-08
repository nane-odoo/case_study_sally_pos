{
    "name": "PSAE Sally Payment Screen", #Required
    "description": "Sally Payment Screen alert to check if plants were watered or not before selling",
    "author": "Odoo PS",
    "website": "https://www.odoo.com",
    "category": "POS",
    "version": "18.0.1.0.0",
    "license": "OEEL-1", #OPL-1
    "depends": ["point_of_sale", "base"],
    "data": [
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "sally_4/static/src/**/*"
        ]
    },
    "installable": True,
    "application": False,
}
