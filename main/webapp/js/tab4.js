// ===== TAB 4: ENTRY / LIST (HIBERNATE + DWR) =====
var Tab4 = (function() {
    function createTab() {
        return {

            title: 'Tab 4: Prefix Manager',
            layout: 'border',
            items: [
                {
                    xtype: 'form',
                    id: 'prefixForm',
                    region: 'north',
                    height: 220,
                    bodyPadding: 20,
                    bodyStyle: 'background-color: #ffffff; border-bottom: 2px solid #3498db;',
                    defaults: { anchor: '100%', labelWidth: 100, xtype: 'textfield', labelStyle: 'font-weight: bold; color: #2c3e50;' },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Add New Prefix',
                            style: 'font-size: 14px; font-weight: bold; color: #2c3e50; display: block; margin-bottom: 15px;'
                        },
                        { fieldLabel: 'Prefix Name', name: 'prefixName', allowBlank: false, emptyText: 'Enter prefix name...' },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Gender',
                            name: 'gender',
                            store: StaticStores.getGenderStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            editable: false,
                            allowBlank: false,
                            emptyText: 'Select gender...'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Prefix Of',
                            name: 'prefixOf',
                            store: StaticStores.getPrefixOfStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            editable: false,
                            emptyText: 'Select prefix type...'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            cls: 'btn-success',
                            style: 'background-color: #27ae60; color: white; border: none; padding: 8px 20px; border-radius: 4px; font-weight: bold;',
                            handler: function() {
                                var form = this.up('form');
                                if (form.isValid()) {
                                    var values = form.getValues();
                                    if (typeof PrefixService === 'undefined') {
                                        Ext.Msg.alert('Error', 'DWR Service not available. Please ensure the server is running.');
                                        return;
                                    }
                                    try {
                                        var options = {
                                            callback: function(response) {
                                                Ext.Msg.alert('Success', 'Prefix saved successfully!');
                                                var store = PrefixStoreModule.getStore();
                                                if (store) {
                                                    store.load();
                                                }
                                                form.reset();
                                            },
                                            errorHandler: function(errorString, exception) {
                                                Ext.Msg.alert('Error', 'Failed to save prefix: ' + errorString);
                                            }
                                        };
                                        PrefixService.savePrefix(values, options);
                                    } catch (err) {
                                        Ext.Msg.alert('Error', 'Exception saving prefix: ' + err);
                                    }
                                }
                            }
                        },
                        {
                            text: 'Clear',
                            iconCls: 'x-fa fa-eraser',
                            style: 'background-color: #95a5a6; color: white; border: none; padding: 8px 20px; border-radius: 4px; font-weight: bold;',
                            handler: function() {
                                this.up('form').reset();
                            }
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: 'prefixGrid',
                    region: 'center',
                    store: PrefixStoreModule.getStore(),
                    cls: 'prefix-grid-enhanced grid-enhanced',
                    columnLines: true,
                    viewConfig: {
                        stripeRows: true,
                        trackOver: true,
                        getRowClass: function(record) {
                            return 'grid-row-highlight';
                        }
                    },
                    columns: [
                        { text: 'ID', dataIndex: 'id', width: 60, align: 'center', sortable: true },
                        { text: 'Prefix Name', dataIndex: 'prefixName', flex: 1, minWidth: 140, sortable: true, renderer: function(value) {
                            return '<span style="font-weight: 500;">' + value + '</span>';
                        }},
                        { text: 'Gender', dataIndex: 'gender', flex: 1, minWidth: 90, sortable: true, renderer: function(value) {
                            var colors = {'M': '#3498db', 'F': '#e75480', 'U': '#95a5a6'};
                            return '<span style="background-color: ' + (colors[value] || '#95a5a6') + '; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px; font-weight: bold;">' + (value || 'N/A') + '</span>';
                        }},
                        { text: 'Prefix Of', dataIndex: 'prefixOf', flex: 1.5, minWidth: 160, sortable: true },
                        {
                            xtype: 'actioncolumn',
                            text: 'Actions',
                            width: 100,
                            align: 'center',
                            items: [{
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Delete Record',
                                style: 'color: #e74c3c;',
                                handler: function(grid, rowIndex, colIndex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    Ext.Msg.confirm('Delete Confirmation', 'Are you sure you want to delete this prefix? This action cannot be undone.', function(btn) {
                                        if (btn === 'yes') {
                                            if (typeof PrefixService === 'undefined') {
                                                Ext.Msg.alert('Error', 'DWR Service not available. Please ensure the server is running.');
                                                return;
                                            }
                                            try {
                                                var options = {
                                                    callback: function(response) {
                                                        Ext.Msg.alert('Success', 'Prefix deleted successfully!');
                                                        var store = PrefixStoreModule.getStore();
                                                        if (store) {
                                                            store.load();
                                                        }
                                                    },
                                                    errorHandler: function(errorString, exception) {
                                                        Ext.Msg.alert('Error', 'Failed to delete prefix: ' + errorString);
                                                    }
                                                };
                                                PrefixService.deletePrefix(record.get('id'), options);
                                            } catch (err) {
                                                Ext.Msg.alert('Error', 'Exception deleting prefix: ' + err);
                                            }
                                        }
                                    });
                                }
                            }]
                        }
                    ],
                    tbar: [{
                        xtype: 'label',
                        text: 'Prefix List',
                        style: 'font-weight: bold; font-size: 13px; color: #2c3e50; margin-right: 20px;'
                    }, '-', {
                        text: 'Refresh',
                        iconCls: 'x-fa fa-refresh',
                        cls: 'btn-primary',
                        style: 'background-color: #3498db; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold;',
                        handler: function() {
                            var store = PrefixStoreModule.getStore();
                            if (store) {
                                store.load();
                            }
                        }
                    }]
                }
            ],
            listeners: {
                activate: function() {
                    var store = PrefixStoreModule.getStore();
                    if (store && !store.isLoading()) {
                        store.load();
                    }
                }
            }
        };
    }

    return {
        create: createTab
    };
})();

