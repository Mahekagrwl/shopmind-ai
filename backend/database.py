import os
from typing import Dict, List, Any
import datetime

# --- DEMO STORES DATA SEED ---

STORES = {
    "biz-freshmart": {
        "id": "biz-freshmart",
        "business_name": "FreshMart Kirana & Supermarket",
        "owner_name": "Anshu Sharma",
        "phone": "+91 99887 76655",
        "email": "freshmart@shopmind.ai",
        "address": "Main Market Road, Block B, Connaught Place, New Delhi",
        "category": "Grocery / Kirana",
        "num_employees": "1-5",
        "currency": "INR",
        "tax_settings": "GST 18%",
        "allow_backorders": False
    },
    "biz-stylehub": {
        "id": "biz-stylehub",
        "business_name": "StyleHub Fashion Boutique",
        "owner_name": "Anshu Sharma",
        "phone": "+91 99887 76655",
        "email": "stylehub@shopmind.ai",
        "address": "MG Road, Fashion Avenue, Bengaluru",
        "category": "Clothing / Fashion",
        "num_employees": "5-10",
        "currency": "INR",
        "tax_settings": "GST 12%",
        "allow_backorders": False
    },
    "biz-bakecraft": {
        "id": "biz-bakecraft",
        "business_name": "BakeCraft Artisanal Bakery",
        "owner_name": "Anshu Sharma",
        "phone": "+91 99887 76655",
        "email": "bakecraft@shopmind.ai",
        "address": "Park Street, Sector 15, Kolkata",
        "category": "Bakery",
        "num_employees": "1-5",
        "currency": "INR",
        "tax_settings": "GST 5%",
        "allow_backorders": True
    }
}

# Products by store
STORE_PRODUCTS = {
    "biz-freshmart": [
        {
            "id": "prod-fm-1",
            "name": "Fortune Sunlite Sunflower Oil 1L",
            "barcode": "8901208001011",
            "category": "Grocery / Kirana",
            "purchase_price": 125.0,
            "selling_price": 145.0,
            "profit_margin": 16.0,
            "stock": 42,
            "min_stock_alert": 10,
            "max_stock": 100,
            "reorder_level": 15,
            "image_url": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop",
            "category_attributes": {"weight": "1 Liter", "unit": "Pack", "batch": "B2026", "expiry": "2027-06-30"},
            "is_archived": False
        },
        {
            "id": "prod-fm-2",
            "name": "Aashirvaad Shudh Chakki Atta 5kg",
            "barcode": "8901058852310",
            "category": "Grocery / Kirana",
            "purchase_price": 230.0,
            "selling_price": 275.0,
            "profit_margin": 19.5,
            "stock": 8,
            "min_stock_alert": 15,
            "max_stock": 80,
            "reorder_level": 20,
            "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop",
            "category_attributes": {"weight": "5 kg", "unit": "Bag", "batch": "AT991", "expiry": "2027-03-15"},
            "is_archived": False
        },
        {
            "id": "prod-fm-3",
            "name": "Organic Farm Fresh Tomatoes 1kg",
            "barcode": "8901058850011",
            "category": "Grocery / Kirana",
            "purchase_price": 22.0,
            "selling_price": 40.0,
            "profit_margin": 81.8,
            "stock": 35,
            "min_stock_alert": 10,
            "max_stock": 50,
            "reorder_level": 15,
            "image_url": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop",
            "category_attributes": {"weight": "1 kg", "type": "Organic Fresh Produce"},
            "is_archived": False
        }
    ],
    "biz-stylehub": [
        {
            "id": "prod-sh-1",
            "name": "Slim Fit Cotton Casual Shirt",
            "barcode": "8907321004521",
            "category": "Clothing / Fashion",
            "purchase_price": 650.0,
            "selling_price": 1299.0,
            "profit_margin": 99.8,
            "stock": 25,
            "min_stock_alert": 5,
            "max_stock": 60,
            "reorder_level": 10,
            "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop",
            "category_attributes": {"size": "L", "color": "Navy Blue", "brand": "UrbanCraft", "collection": "Summer 2026"},
            "is_archived": False
        },
        {
            "id": "prod-sh-2",
            "name": "Classic Indigo Denim Jeans",
            "barcode": "8907321008890",
            "category": "Clothing / Fashion",
            "purchase_price": 900.0,
            "selling_price": 1999.0,
            "profit_margin": 122.1,
            "stock": 18,
            "min_stock_alert": 4,
            "max_stock": 40,
            "reorder_level": 8,
            "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop",
            "category_attributes": {"size": "32 Waist", "color": "Dark Indigo", "brand": "DenimStudio"},
            "is_archived": False
        }
    ],
    "biz-bakecraft": [
        {
            "id": "prod-bc-1",
            "name": "Fresh Butter Croissant (Pack of 2)",
            "barcode": "8904001992014",
            "category": "Bakery",
            "purchase_price": 60.0,
            "selling_price": 120.0,
            "profit_margin": 100.0,
            "stock": 18,
            "min_stock_alert": 5,
            "max_stock": 50,
            "reorder_level": 10,
            "image_url": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop",
            "category_attributes": {"production_date": "2026-10-02", "shelf_life": "3 Days", "wastage_risk": "High"},
            "is_archived": False
        },
        {
            "id": "prod-bc-2",
            "name": "Dutch Dark Chocolate Truffle Cake 500g",
            "barcode": "8904001995521",
            "category": "Bakery",
            "purchase_price": 320.0,
            "selling_price": 650.0,
            "profit_margin": 103.1,
            "stock": 6,
            "min_stock_alert": 2,
            "max_stock": 15,
            "reorder_level": 3,
            "image_url": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop",
            "category_attributes": {"production_date": "2026-10-02", "shelf_life": "2 Days", "batch": "CAKE-99"},
            "is_archived": False
        }
    ]
}

# Transactions by store
STORE_TRANSACTIONS = {
    "biz-freshmart": [
        {
            "id": "tx-fm-1001",
            "invoice_no": "INV-FM-001",
            "created_at": "2026-10-02 18:30:12",
            "items": [
                {"name": "Fortune Sunlite Sunflower Oil 1L", "qty": 2, "price": 145.0, "total": 290.0},
                {"name": "Aashirvaad Shudh Chakki Atta 5kg", "qty": 1, "price": 275.0, "total": 275.0}
            ],
            "subtotal": 565.0,
            "discount": 15.0,
            "tax": 99.0,
            "total": 649.0,
            "payment_method": "UPI",
            "cashier_name": "Ramesh Kumar"
        }
    ],
    "biz-stylehub": [
        {
            "id": "tx-sh-1001",
            "invoice_no": "INV-SH-001",
            "created_at": "2026-10-02 19:45:00",
            "items": [
                {"name": "Slim Fit Cotton Casual Shirt", "qty": 1, "price": 1299.0, "total": 1299.0}
            ],
            "subtotal": 1299.0,
            "discount": 100.0,
            "tax": 215.82,
            "total": 1414.82,
            "payment_method": "Card",
            "cashier_name": "Anita Verma"
        }
    ],
    "biz-bakecraft": [
        {
            "id": "tx-bc-1001",
            "invoice_no": "INV-BC-001",
            "created_at": "2026-10-02 16:15:00",
            "items": [
                {"name": "Fresh Butter Croissant (Pack of 2)", "qty": 2, "price": 120.0, "total": 240.0}
            ],
            "subtotal": 240.0,
            "discount": 0.0,
            "tax": 12.0,
            "total": 252.0,
            "payment_method": "Cash",
            "cashier_name": "Suresh Baker"
        }
    ]
}

# Suppliers by store
STORE_SUPPLIERS = {
    "biz-freshmart": [
        {
            "id": "sup-fm-1",
            "name": "Metro Cash & Carry Wholesale",
            "phone": "+91 98765 43210",
            "email": "orders@metrowholesale.in",
            "address": "Plot 14, Industrial Area Phase 2, New Delhi",
            "products_supplied": ["FMCG", "Grocery", "Packaged Goods"],
            "avg_delivery_days": 2,
            "notes": "Primary FMCG supplier for Kirana stock."
        }
    ],
    "biz-stylehub": [
        {
            "id": "sup-sh-1",
            "name": "Urban Mills & Textile Apparel Ltd",
            "phone": "+91 98112 88990",
            "email": "supply@urbanmills.in",
            "address": "Textile Hub, Tirupur, Tamil Nadu",
            "products_supplied": ["Shirts", "Denim", "Knitwear"],
            "avg_delivery_days": 4,
            "notes": "High quality cotton clothing supplier."
        }
    ],
    "biz-bakecraft": [
        {
            "id": "sup-bc-1",
            "name": "Bakers Pride Flour & Dairy Supplies",
            "phone": "+91 98112 00112",
            "email": "orders@bakerspride.com",
            "address": "Dairy Enclave, Anand, Gujarat",
            "products_supplied": ["Butter", "Flour", "Chocolates", "Cream"],
            "avg_delivery_days": 1,
            "notes": "Daily morning fresh dairy supply."
        }
    ]
}

# Wastage by store
STORE_WASTAGE = {
    "biz-freshmart": [
        {
            "id": "wast-fm-1",
            "product_id": "prod-fm-3",
            "product_name": "Organic Farm Fresh Tomatoes 1kg",
            "quantity": 3,
            "reason": "Spoiled / Expired",
            "estimated_cost": 66.0,
            "recorded_at": "2026-10-01 18:00:00"
        }
    ],
    "biz-stylehub": [],
    "biz-bakecraft": [
        {
            "id": "wast-bc-1",
            "product_id": "prod-bc-1",
            "product_name": "Fresh Butter Croissant (Pack of 2)",
            "quantity": 4,
            "reason": "Unsold / Over-shelf life",
            "estimated_cost": 240.0,
            "recorded_at": "2026-10-01 21:00:00"
        }
    ]
}

class InMemoryDB:
    def __init__(self):
        self.active_store_id = "biz-freshmart"
        self.stores = dict(STORES)
        
        # Load active store entities
        self.load_store("biz-freshmart")
        
        self.users = [
            {
                "id": "user-owner-1",
                "full_name": "Anshu Sharma",
                "email": "owner@shopmind.ai",
                "phone": "9988776655",
                "role": "Owner",
                "business_id": "biz-freshmart",
                "created_at": "2026-10-01"
            },
            {
                "id": "user-cashier-1",
                "full_name": "Ramesh Cashier",
                "email": "cashier@shopmind.ai",
                "phone": "9876543210",
                "role": "Cashier",
                "business_id": "biz-freshmart",
                "created_at": "2026-10-01"
            }
        ]
        self.customers = [
            {
                "id": "cust-1",
                "name": "Rajesh Malhotra",
                "phone": "+91 98765 00001",
                "email": "rajesh.m@gmail.com",
                "address": "House 42, Green Park, New Delhi",
                "total_purchases": 4850.0,
                "loyalty_points": 485,
                "created_at": "2026-09-15"
            }
        ]
        self.employees = [
            {
                "id": "emp-1",
                "name": "Ramesh Kumar",
                "role": "Cashier",
                "email": "ramesh@shopmind.ai",
                "phone": "+91 98765 43210",
                "is_active": True,
                "permissions": ["pos_access", "invoice_print"]
            }
        ]
        self.notifications = [
            {
                "id": "notif-1",
                "title": "Low Stock Warning: Aashirvaad Atta",
                "message": "Stock level is 8 units (Below threshold 15). Reorder recommended.",
                "type": "low_stock",
                "is_read": False,
                "created_at": "2026-10-02 10:00:00",
                "role_visibility": ["Owner", "Manager", "Inventory Staff"]
            }
        ]
        self.stock_movements = []

    def load_store(self, store_id: str):
        if store_id not in self.stores:
            store_id = "biz-freshmart"
        self.active_store_id = store_id
        self.business_info = self.stores[store_id]
        self.products = STORE_PRODUCTS.get(store_id, [])
        self.transactions = STORE_TRANSACTIONS.get(store_id, [])
        self.suppliers = STORE_SUPPLIERS.get(store_id, [])
        self.wastage = STORE_WASTAGE.get(store_id, [])

db = InMemoryDB()
