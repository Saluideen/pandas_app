import frappe
import pandas as pd

def test():
    pass

def execute(filters=None):
    # Fetch data from the Demo doctype
    pr = frappe.db.get_list("Demo", fields=["name", "date", "name1", "amount", "balance"])
    df = pd.DataFrame.from_records(pr)
    df['date'] = pd.to_datetime(df['date'])
    grouped = df.groupby('name1')
    structured_data = []
    
    for name1, group in grouped:
        structured_data.append({'name1': name1, 'date': '', 'name': '', 'amount': '', 'balance': '', 'visit': ''})
        for _, row in group.iterrows():
            structured_data.append({
                'name1': '',
                'date': row['date'].strftime('%Y-%m-%d'),
                'name': row['name'],
                'amount': row['amount'],
                'balance': row['balance'],
                'visit': f'<button onclick="frappe.set_route(\'Form\', \'Demo\', \'{row["name"]}\')">Visit</button>'
            })
    df_structured = pd.DataFrame(structured_data)
    column_names = df_structured.columns.values.tolist()
    data = df_structured.to_dict('records')
    columns = [{"fieldname": col, "label": col.capitalize(), "fieldtype": "Data"} for col in column_names]
    
    # Add the visit column definition
    columns.append({"fieldname": "visit", "label": "Visit", "fieldtype": "HTML"})

    # Adding a chart
    chart = {
        "type": "bar",
        "data": {
            "labels": [record['name1'] for record in data if record['name1']],
            "datasets": [{
                "name": "Amount",
                "values": [record['amount'] for record in data if record['amount']]
            }]
        },
        "title": "Amount per Name",
        "xAxisLabel": "Name1",
        "yAxisLabel": "Amount"
    }
    
    return columns, data, None, chart
