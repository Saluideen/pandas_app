// Copyright (c) 2024, s and contributors
// For license information, please see license.txt

frappe.ui.form.on("demo table", {
	refresh(frm) {
        frm.dashboard.clear_comment();
			frm.dashboard.add_comment(
				__("Welcome to demo table"),
				"blue",
				true
			);

	},
});
