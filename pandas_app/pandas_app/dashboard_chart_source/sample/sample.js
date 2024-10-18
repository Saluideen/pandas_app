frappe.provide('frappe.dashboards.chart_sources');

frappe.dashboards.chart_sources["demo_chart"] = {
    method: "pandas_app.pandas_app.dashboard_chart_source.sample.sample.get",
    filters: [
        {
            fieldname: "name",
            label: __("Name"),
            fieldtype: "Data",
            reqd: 1
        },
        {
            fieldname: "amount",
            label: __("Amount"),
            fieldtype: "Data",
            reqd: 1
        },
    ],

}
//     // Render function for the table
//     render: function(wrapper, data) {
//         // Clear previous content
//         $(wrapper).empty();

//         // Create the table
//         let table = $('<table class="table table-bordered">').appendTo(wrapper);

//         // Create the table header
//         let thead = $('<thead>').appendTo(table);
//         let headerRow = $('<tr>').appendTo(thead);
//         data.columns.forEach(col => {
//             $('<th>').text(col.label).appendTo(headerRow);
//         });

//         // Create the table body
//         let tbody = $('<tbody>').appendTo(table);
//         data.data.forEach(row => {
//             let dataRow = $('<tr>').appendTo(tbody);
//             data.columns.forEach(col => {
//                 $('<td>').text(row[col.fieldname]).appendTo(dataRow);
//             });
//         });
//     },

//     // Fetch data and call the render function
//     get_data: function(chart, settings) {
//         frappe.call({
//             method: this.method,
//             args: settings,
//             callback: function(r) {
//                 if (r.message) {
//                     frappe.dashboards.chart_sources["demo_chart"].render(chart.wrapper, r.message);
//                 }
//             }
//         });
//     }
// };

// // To manually refresh the chart
// frappe.pages['Dashboard'].refresh = function() {
//     frappe.dashboards.chart_sources["demo_chart"].get_data(chart, {});
// };

// // Initialize the custom chart when the dashboard is ready
// frappe.ui.form.on("Dashboard", {
//     refresh: function(frm) {
//         frappe.dashboards.chart_sources["demo_chart"].get_data(frm.chart, {});
// //     }
// });
