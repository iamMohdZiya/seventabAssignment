// ===== TAB 1: DROPDOWN COMPONENTS =====
var Tab1 = (function() {
    function createTab() {
        return {
            title: 'Tab 1: Dropdown',
            layout: 'vbox',
            defaults: { layout: 'vbox', padding: 15, style: 'background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);' },
            items: [
                {
                    xtype: 'container',
                    html: '<h3 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 12px; margin: 0 0 10px 0; font-size: 15px; font-weight: 600;">1. HTML Select Component</h3>',
                    height: 35
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height: 45,
                    spacing: 20,
                    defaults: { style: 'display: flex; align-items: center;' },
                    items: [
                        {
                            xtype: 'component',
                            html: '<label style="display: inline-block; width: 150px; font-weight: bold; color: #333;">DEPARTMENT:</label>',
                            flex: 0
                        },
                        {
                            xtype: 'component',
                            html: '<select id="html-dept" style="width: 220px; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; background-color: #ffffff; color: #2c3e50; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">' +
                                  '<option value="">Select Department</option>' +
                                  '<option value="CT">CT SCAN</option>' +
                                  '<option value="CYTO">CYTOLOGY</option>' +
                                  '<option value="XRAY">DIGITAL X-RAY</option>' +
                                  '<option value="HEMA">HAEMATOLOGY</option>' +
                                  '</select>',
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<label style="display: inline-block; width: 150px; font-weight: bold; color: #333;">STATIC VALUE:</label>',
                            flex: 0
                        },
                        {
                            xtype: 'component',
                            html: '<select id="html-static" style="width: 220px; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; background-color: #ffffff; color: #2c3e50; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.08);" disabled>' +
                                  '<option value="static">Static Value</option>' +
                                  '</select>',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<hr style="border: none; border-top: 1px solid #e8e8e8; margin: 15px 0;"/>',
                    height: 15
                },
                {
                    xtype: 'container',
                    html: '<h3 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 12px; margin: 0 0 10px 0; font-size: 15px; font-weight: 600;">2. ExtJS ComboBox Component</h3>',
                    height: 35
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height: 45,
                    spacing: 20,
                    defaults: { style: 'display: flex; align-items: center;' },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Department',
                            labelWidth: 150,
                            labelStyle: 'font-weight: bold; color: #2c3e50;',
                            store: StaticStores.getDepartmentStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            width: 380,
                            flex: 0,
                            editable: true,
                            style: 'border-radius: 4px;'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Static Value',
                            labelWidth: 150,
                            labelStyle: 'font-weight: bold; color: #2c3e50;',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['value', 'display'],
                                data: [
                                    {"value": "static", "display": "Static Value"}
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'display',
                            valueField: 'value',
                            width: 330,
                            flex: 0,
                            editable: false,
                            style: 'border-radius: 4px;'
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<hr style="border: none; border-top: 1px solid #e8e8e8; margin: 15px 0;"/>',
                    height: 15
                },
                {
                    xtype: 'container',
                    html: '<div style="color: #555; font-size: 13px; line-height: 1.6; padding: 12px; background: #f8fafb; border-left: 4px solid #3498db; border-radius: 4px;"><strong style="color: #2c3e50;">Note:</strong> Tab 1 demonstrates two HTML dropdowns and two ExtJS ComboBox components with static hardcoded values. You can select values from each dropdown.</div>',
                    height: 60
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();

