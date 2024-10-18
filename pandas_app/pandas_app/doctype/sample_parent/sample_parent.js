// Custom script for Sample Parent
frappe.ui.form.on('Sample Parent', {
    refresh: function(frm) {
        frm.fields_dict['table'].grid.get_field('name1').get_query = function() {
            return {
                filters: [
                    ['name1', '!=', '']
                ]
            };
        };
    }
});

// Custom script for Sample Child
frappe.ui.form.on('sample child', {
    name1: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: 'Select Months',
            fields: [
                {
                    fieldtype: 'MultiCheck',
                    fieldname: 'months',
                    label: 'Months',
                    options: [],
                    

                }
            ],
            primary_action: function() {
                var selected_months = d.get_values().months;
                var month_names = selected_months.join(', ');
                frappe.model.set_value(cdt, cdn, 'name1', month_names);
                frm.refresh_field('table');
                d.hide();
            },
            primary_action_label: 'Select'
        });

        // Fetch data from the Month DocType and populate the MultiCheck options
        frappe.call({
            method: 'pandas_app.pandas_app.doctype.sample_parent.sample_parent.get_months',
            // args: {
            //     doctype: 'Months',
            //     fields: ['name']
            // },
            callback: function(r) {
                console.log(r);
                if (r.message) {
                    var options = r.message.map(function(month) {
                        return { label: month.name, value: month.name };
                    });
                    d.fields_dict.months.df.options = options;
                    d.fields_dict.months.df.default="07c8b10cc1"
                    d.fields_dict.months.refresh();
                }
            }
        });

        d.show();
    }
});
