import frappe
from frappe.utils.dashboard import cache_source
from frappe.utils import add_to_date, formatdate, get_link_to_form, getdate, nowdate

@frappe.whitelist()
@cache_source
def get(
    chart_name=None,
    chart=None,
    no_cache=None,
    filters=None,
    from_date=None,
    to_date=None,
    timespan=None,
    time_interval=None,
    heatmap_year=None,
):
    print("Demo Chart Source")
    
    # Fetch data from the "demo table"
    data = frappe.get_all("demo table", fields=["item", "amount_1", "amount_2"])
    print("data", data)
    
    # Process the data for the chart
    labels = []
    values = []

    for entry in data:
        labels.append(entry["item"])  # Assuming "item" is a string or date that can be formatted as a label
        values.append(entry["amount_1"])  # Assuming "amount_1" is the value to be used in the chart

    return {
        "labels": labels,
        "datasets": [{
            "name": "Demo Dataset",
            "values": values
        }]
    }
