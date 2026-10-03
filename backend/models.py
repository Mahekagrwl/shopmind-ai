from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class UserRegister(BaseModel):
    full_name: str
    email: str
    phone: str
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    identifier: str # Email or phone
    password: str
    remember_me: Optional[bool] = False

class User(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str
    role: str # Owner, Manager, Cashier, Inventory Staff, Accountant, Customer
    business_id: Optional[str] = None
    created_at: str

class BusinessDetails(BaseModel):
    business_name: str
    owner_name: str
    phone: str
    email: str
    address: str
    category: str # Grocery, Clothing, Pharmacy, Bakery, Electronics, Cosmetics, Stationery, Footwear, Restaurant, Hardware, Other
    num_employees: str
    currency: str = "INR"
    tax_settings: str = "GST 18%"
    allow_backorders: bool = False

class Product(BaseModel):
    id: str
    name: str
    barcode: str
    category: str
    purchase_price: float
    selling_price: float
    profit_margin: float
    stock: int
    min_stock_alert: int = 10
    max_stock: int = 200
    reorder_level: int = 15
    image_url: Optional[str] = None
    category_attributes: Dict[str, Any] = {} # e.g. size/color for fashion, expiry/batch for pharmacy
    is_archived: bool = False

class CartItem(BaseModel):
    product_id: str
    quantity: int
    unit_price: float
    discount: float = 0.0

class POSCheckoutRequest(BaseModel):
    cart_items: List[CartItem]
    payment_method: str # Cash, UPI, Card, Other
    customer_phone: Optional[str] = None
    discount_amount: float = 0.0
    tax_percentage: float = 18.0

class Transaction(BaseModel):
    id: str
    invoice_no: str
    created_at: str
    items: List[Dict[str, Any]]
    subtotal: float
    discount: float
    tax: float
    total: float
    payment_method: str
    cashier_name: str
    customer_phone: Optional[str] = None

class Supplier(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    address: str
    products_supplied: List[str]
    avg_delivery_days: int
    notes: Optional[str] = ""

class PurchaseOrder(BaseModel):
    id: str
    supplier_id: str
    supplier_name: str
    order_date: str
    status: str # Pending, Partial, Received, Cancelled
    items: List[Dict[str, Any]]
    total_cost: float

class WastageEntry(BaseModel):
    id: str
    product_id: str
    product_name: str
    quantity: int
    reason: str # Expired, Damaged, Spoiled, Unsold, Broken, Other
    estimated_cost: float
    recorded_at: str
    photo_url: Optional[str] = None

class Customer(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    address: Optional[str] = ""
    total_purchases: float = 0.0
    loyalty_points: int = 0
    created_at: str

class Employee(BaseModel):
    id: str
    name: str
    role: str
    email: str
    phone: str
    is_active: bool = True
    permissions: List[str] = []

class Notification(BaseModel):
    id: str
    title: str
    message: str
    type: str # low_stock, expiring, wastage, purchase, alert
    is_read: bool = False
    created_at: str
    role_visibility: List[str] = ["Owner", "Manager"]

class StockMovement(BaseModel):
    id: str
    product_id: str
    product_name: str
    change_qty: int
    reason: str
    timestamp: str
