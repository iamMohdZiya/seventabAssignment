// ===== TAB 4: ENTRY / LIST (HIBERNATE + DWR) =====
var Tab4 = (function() {
    function createTab() {
        return {
            title: 'Tab 4: Prefix Manager',
            layout: 'border',
            style: 'background-color: #f6f7fb; padding: 15px;',
            defaults: {
                border: false,
                shadow: false
            },
            items: [
                // --- NORTH: ENTRY FORM ---
                {
                    xtype: 'form',
                    id: 'prefixForm',
                    region: 'north',
                    height: 180,
                    cls: 'form-section',
                    bodyPadding: '20 25',
                    margin: '0 0 15 0',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.33,
                        layout: 'anchor',
                        padding: '0 15 0 0',
                        labelAlign: 'top'
                    },

                    tbar: {
                        cls: 'toolbar-card',
                        style: 'padding: 10px 15px;',
                        items: [
                            {
                                xtype: 'component',
                                html: '<div class="toolbar-title"><span class="bar"></span>Add New Prefix</div>'
                            }
                        ]
                    },

                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PREFIX NAME',
                                    name: 'prefixName',
                                    allowBlank: false,
                                    emptyText: 'e.g., Mr, Dr, Mrs',
                                    anchor: '100%',
                                    labelStyle: 'font-weight: 600; color: #7f8c8d; font-size: 11px; letter-spacing: 0.5px;'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'GENDER',
                                    name: 'gender',
                                    store: StaticStores.getGenderStore(),
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'code',
                                    editable: false,
                                    allowBlank: false,
                                    emptyText: 'Select...',
                                    anchor: '100%',
                                    labelStyle: 'font-weight: 600; color: #7f8c8d; font-size: 11px; letter-spacing: 0.5px;'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'PREFIX OF',
                                    name: 'prefixOf',
                                    store: StaticStores.getPrefixOfStore(),
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'code',
                                    editable: false,
                                    emptyText: 'Select Type...',
                                    anchor: '100%',
                                    labelStyle: 'font-weight: 600; color: #7f8c8d; font-size: 11px; letter-spacing: 0.5px;'
                                }
                            ]
                        }
                    ],

                    // Button Bar moved to bottom of form
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        style: 'background: white; padding: 10px 0 0 0;',
                        items: [
                            '->', // Push buttons to right
                            {
                                text: 'Clear',
                                cls: 'btn-danger', // Use CSS class
                                width: 100,
                                handler: function() {
                                    this.up('form').reset();
                                }
                            },
                            {
                                text: 'Save Record',
                                cls: 'btn-success', // Use CSS class
                                iconCls: 'x-fa fa-check',
                                width: 130,
                                margin: '0 0 0 10',
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
                            }
                        ]
                    }]
                },

                // --- CENTER: GRID ---
                {
                    xtype: 'grid',
                    id: 'prefixGrid',
                    region: 'center',
                    store: PrefixStoreModule.getStore(),
                    cls: 'grid-enhanced grid-card',
                    style: 'border: 1px solid #e5e7eb;',
                    bodyStyle: 'border: none;',

                    columnLines: false,
                    viewConfig: {
                        stripeRows: true,
                        trackOver: true,
                        emptyText: '<div style="text-align:center; padding:20px; color:#999;">No prefixes found</div>'
                    },

                    // Grid Toolbar
                    tbar: {
                        cls: 'toolbar-card',
                        padding: '12',
                        items: [
                            {
                                xtype: 'component',
                                html: '<div class="toolbar-title"><span class="bar"></span>Existing Prefixes</div>'
                            },
                            '->',
                            {
                                text: 'Refresh List',
                                cls: 'btn-primary',
                                iconCls: 'x-fa fa-refresh',
                                handler: function() {
                                    var store = PrefixStoreModule.getStore();
                                    if (store) {
                                        store.load();
                                    }
                                }
                            }
                        ]
                    },

                    columns: [
                        {
                            text: 'ID',
                            dataIndex: 'id',
                            width: 80,
                            align: 'center',
                            sortable: true,
                            renderer: function(v) { return '<span class="cell-id">' + v + '</span>'; }
                        },
                        {
                            text: 'PREFIX NAME',
                            dataIndex: 'prefixName',
                            flex: 1,
                            minWidth: 140,
                            sortable: true,
                            renderer: function(value) {
                                return '<span class="cell-name">' + value + '</span>';
                            }
                        },
                        {
                            text: 'GENDER',
                            dataIndex: 'gender',
                            flex: 1,
                            minWidth: 90,
                            sortable: true,
                            renderer: function(value) {
                                var classMap = { 'M': 'badge--gender-m', 'F': 'badge--gender-f', 'U': 'badge--gender-u' };
                                var cls = classMap[value] || 'badge--gender-u';
                                return '<span class="badge ' + cls + '">' + (value || 'N/A') + '</span>';
                            }
                        },
                        {
                            text: 'PREFIX TYPE',
                            dataIndex: 'prefixOf',
                            flex: 1.5,
                            minWidth: 160,
                            sortable: true,
                            renderer: function(v) { return '<span class="cell-muted">' + v + '</span>'; }
                        },
                        {
                            xtype: 'actioncolumn',
                            text: 'ACTION',
                            width: 80,
                            align: 'center',
                            items: [{
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Delete Record',
                                // UI IMPROVEMENT: Use a visual button style for the icon
                                handler: function(grid, rowIndex, colIndex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    Ext.Msg.show({
                                        title: 'Delete Confirmation',
                                        message: 'Are you sure you want to delete this prefix?',
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.Msg.WARNING,
                                        fn: function(btn) {
                                            if (btn === 'yes') {
                                                if (typeof PrefixService === 'undefined') {
                                                    Ext.Msg.alert('Error', 'Service unavailable');
                                                    return;
                                                }
                                                // Existing Logic
                                                try {
                                                    var options = {
                                                        callback: function() {
                                                            Ext.Msg.alert('Success', 'Deleted successfully');
                                                            var store = PrefixStoreModule.getStore();
                                                            if (store) store.load();
                                                        },
                                                        errorHandler: function(e) { Ext.Msg.alert('Error', e); }
                                                    };
                                                    PrefixService.deletePrefix(record.get('id'), options);
                                                } catch (err) { Ext.Msg.alert('Error', err); }
                                            }
                                        }
                                    });
                                }
                            }]
                        }
                    ]
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