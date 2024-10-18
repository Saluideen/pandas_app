frappe.ui.keys.add_shortcut({
    description:"Open the demo page",
    shortcut:"shift+ctrl+d",
    action:()=>{
        frappe.set_route("List","Error Log")
    }
})
