# Copyright (c) 2024, s and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import validate_phone_number

class demotable(Document):
	
	def after_insert(self):
		page = frappe.get_doc("Page", "demo-page")
		print(page)
	
		page.load_assets()


	def validate(self):
		# validate_phone_number('753858375') 
		validate_phone_number('+91-75385837',throw=True)
		validate_phone_number('56789032',throw=True)

		# Invalid phone numbers
		# validate_phone_number('invalid') # False
		# validate_phone_number('87345%%', throw=True) 
			
