# Copyright (c) 2024, s and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document


class test(Document):
	def on_update(self):
		frappe.clear_cache()
