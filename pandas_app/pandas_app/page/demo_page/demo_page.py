import frappe
import json

@frappe.whitelist()
def get_data(filter=None):
    try:
        # Define filters
        filters = {}
        if filter:
            filters = {'item': ['like', f'%{filter}%']}

        # Fetch data from the demo_table DocType
        records = frappe.get_list('demo table', fields=['item', 'amount_1', 'amount_2'], filters=filters)
        frappe.logger().info(f"Fetched data: {records}")

        # Process the data
        data = {
            "index": [record['item'] for record in records],
            "columns": ["item", "amount_1", "amount_2", "sum"],
            "data": []
        }

        for record in records:
            # Convert amount_1 and amount_2 to numeric types and handle non-numeric values
            try:
                amount_1 = float(record['amount_1'])
            except (ValueError, TypeError):
                amount_1 = 0.0

            try:
                amount_2 = float(record['amount_2'])
            except (ValueError, TypeError):
                amount_2 = 0.0

            # Calculate the sum
            sum_amount = amount_1 + amount_2

            # Append the processed record to the data
            data["data"].append([record['item'], amount_1, amount_2, sum_amount])

        # Fetch the dashboard chart data
        chart_name = "Demo chart"  # Replace with your dashboard chart name
        try:
            chart = frappe.get_doc('Dashboard Chart', chart_name)
            if not chart:
                raise Exception("Dashboard Chart not found")
            chart_data = chart.get('data', {})
            if not chart_data:
                raise Exception("Chart data is empty")
            frappe.logger().info(f"Fetched chart data: {chart_data}")
        except Exception as e:
            frappe.logger().error(f"Error fetching chart data: {str(e)}")
            chart_data = None

        # Combine the data and chart data into a single response
        response_data = {
            "table_data": data,
            "chart_data": chart_data
        }

        # Convert the response data to JSON
        response_json = json.dumps(response_data)
        frappe.logger().info(f"JSON response data: {response_json}")
        
        return response_json
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Error in get_data")
        frappe.throw("There was an error processing the data. Please check the logs for more details.")
