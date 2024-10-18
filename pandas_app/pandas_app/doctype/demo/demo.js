frappe.ui.form.on("Demo", {
    refresh(frm) {
        frappe.require("form_builder.bundle.js").then(() => {
			frappe.form_builder = new frappe.ui.FormBuilder({
				wrapper: $(frm.fields_dict["form_builder"].wrapper),
				frm: frm,
				doctype: frm.doc.name,
				customize: false,
			});
		});
    //     frm.fields_dict['link'].grid.get_query = function (doc, cdt, cdn) {
    //         // Assuming 'search_text' is the field where users enter their search query
    //         const searchText = doc.search_text || '';

    //         return {
    //             doctype: "Demo table",
    //             searchfield: 'item',
    //             txt: searchText, // Dynamically setting the search text
    //             no_spinner: false,
    //             filters: [
    //                 ["name", '=', doc.name],
    //                 // ['Child Lead Partner Role', 'subsorce', '=', "Associate partner"],
    //             ]
    //         };
    //     }
    },
    onload: function(frm) {
        frappe.db.get_list('demo table', {
            fields: ['name'],
            order_by: 'creation',
            limit:1

        }).then(records => {
            frm.doc.link = records[0].name;
            frm.refresh_field('link')
    });
}

});
