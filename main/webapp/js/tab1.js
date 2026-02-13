// ===== TAB 1: DROPDOWN COMPONENTS =====
var Tab1 = (function() {
    function createTab() {
        return {
            title: 'Tab 1: Dropdown',
            layout: 'vbox',
            // UI IMPROVEMENT: Added 'form-section' class for consistent card styling
            cls: 'form-section',
            style: 'margin: 15px', // Add margin around the card
            defaults: {
                layout: 'anchor',
                width: '100%',
                margin: '0 0 20 0' // Bottom spacing between rows
            },
            items: [
                // --- SECTION 1: HTML SELECTS ---
                {
                    xtype: 'component',
                    html: '<h3>1. HTML Select Component</h3>'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 30 0 0'
                    },
                    items: [
                        {
                            xtype: 'component',
                            html: '<label class="field-label">Department</label>' +
                                  '<select id="html-dept" class="select-input">' +
                                  '<option value="">Select Department</option>' +
                                  '<option value="CT">CT SCAN</option>' +
                                  '<option value="CYTO">CYTOLOGY</option>' +
                                  '<option value="XRAY">DIGITAL X-RAY</option>' +
                                  '<option value="HEMA">HAEMATOLOGY</option>' +
                                  '</select>'
                        },
                        {
                            xtype: 'component',
                            html: '<label class="field-label">Static Value</label>' +
                                  '<select id="html-static" class="select-input is-disabled" disabled>' +
                                  '<option value="static">Static Value</option>' +
                                  '</select>'
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<div class="divider"></div>'
                },

                // --- SECTION 2: EXTJS COMBOBOXES ---
                {
                    xtype: 'component',
                    html: '<h3>2. ExtJS ComboBox Component</h3>'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top', // UI IMPROVEMENT: Top labels are cleaner
                        labelSeparator: '',
                        margin: '0 30 0 0',
                        width: 250
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'DEPARTMENT', // Uppercase to match style
                            labelStyle: 'font-weight: 600; color: #5d6d7e; font-size: 12px; letter-spacing: 0.5px;',
                            store: StaticStores.getDepartmentStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            editable: true,
                            emptyText: 'Select Department...'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'STATIC VALUE',
                            labelStyle: 'font-weight: 600; color: #5d6d7e; font-size: 12px; letter-spacing: 0.5px;',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['value', 'display'],
                                data: [
                                    {"value": "static", "display": "Static Value"}
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'display',
                            valueField: 'value',
                            editable: false,
                            value: 'static', // Set default value visually
                            readOnly: true,
                            fieldStyle: 'background-color: #f8f9fa; color: #7f8c8d;' // Visual disabled state
                        }
                    ]
                },

                // --- FOOTER NOTE ---
                {
                    xtype: 'container',
                    margin: '30 0 0 0',
                    html: '<div class="note-box">' +
                          '<span class="note-title">Note</span>' +
                          'Tab 1 demonstrates two HTML dropdowns and two ExtJS ComboBox components with static hardcoded values. You can select values from each dropdown.' +
                          '</div>'
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();