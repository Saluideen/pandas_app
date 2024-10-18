import frappe
from frappe.model.document import Document


class Demo(Document):
    def onload(self):
       
        print( frappe.qb.DocType("Demo").get_qb(self.name))
    # pass
    # def onload(self):
    #     # Fetch data from "demo table"
    #     doc = frappe.get_all("demo table", fields=["name", "item", "amount_1", "amount_2"])

    #     # Start constructing the HTML message
    #     message = """
    #     <div style='text-align: center;'>
    #         <div style='display: inline-block; margin-top: 20px;'>
    #             <table border="1" style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);'>
    #                 <tr style='background-color: #f2f2f2; color: #333;'>
    #                     <th style='padding: 10px; text-align: left; font-weight: bold;'>Item</th>
    #                     <th style='padding: 10px; text-align: left; font-weight: bold;'>Amount 1</th>
    #                     <th style='padding: 10px; text-align: left; font-weight: bold;'>Amount 2</th>
    #                 </tr>
    #     """

    #     # Add rows for each document
    #     for row in doc:
    #         name_link = frappe.utils.get_link_to_form("demo table", row['name'])
    #         message += f"""
    #                 <tr style='color: #555;'>
    #                     <td style='padding: 10px; border: 1px solid #ddd;'>{name_link}</td>
    #                     <td style='padding: 10px; border: 1px solid #ddd;'>{row['item']}</td>
    #                     <td style='padding: 10px; border: 1px solid #ddd;'>{row['amount_1']}</td>
    #                     <td style='padding: 10px; border: 1px solid #ddd;'>{row['amount_2']}</td>
    #                 </tr>
    #         """

    #     # Close the table and div tags
    #     message += """
    #             </table>
    #         </div>
    #     </div>
    #     """

    #     # Display the message using frappe.throw with a custom title
    #     frappe.throw(message, title="Demo Table")
