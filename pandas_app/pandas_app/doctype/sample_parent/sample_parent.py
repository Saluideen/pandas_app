# Copyright (c) 2024, s and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class sampleparent(Document):
	pass

@frappe.whitelist()
def get_months():
	month=frappe.get_all("Months",fields=["name"])
	return month