// ===== TAB 6: REST API MANAGER =====
var Tab6 = (function() {

    // --- UTILITY: UPDATE JSON DISPLAY ---
    function updateJsonDisplay() {
        var store = PrefixStoreModule.getStore();
        if (!store) return;

        var records = store.getRange();
        var jsonData = {
            meta: {
                timestamp: new Date().toISOString(),
                totalRecords: records.length,
                status: 'OK'
            },
            data: records.map(function(record) {
                return record.getData(); // Clean way to get record data
            })
        };

        var jsonElement = document.getElementById('jsonDisplayArea');
        if (jsonElement) {
            // Pretty print with 2 spaces
            jsonElement.innerHTML = JSON.stringify(jsonData, null, 2);
        }
    }

    function createTab() {
        return {
            title: 'Tab 6: REST API Manager',
            layout: 'border',
            style: 'background-color: #f6f7fb; padding: 15px;',
            defaults: { border: false, shadow: false },

            items: [
                // --- NORTH: API ENTRY FORM ---
                {
                    xtype: 'form',
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
                        items: [{ xtype: 'component', html: '<div class="toolbar-title"><span class="bar"></span>Create New Record via API</div>' }]
                    },

                    items: [
                        {
                            xtype: 'container',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'PREFIX NAME',
                                name: 'prefixName',
                                allowBlank: false,
                                emptyText: 'e.g., Sr.',
                                anchor: '100%',
                                labelStyle: 'font-weight: 600; color: #7f8c8d; font-size: 11px; letter-spacing: 0.5px;'
                            }]
                        },
                        {
                            xtype: 'container',
                            items: [{
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
                            }]
                        },
                        {
                            xtype: 'container',
                            items: [{
                                xtype: 'combobox',
                                fieldLabel: 'PREFIX TYPE',
                                name: 'prefixOf',
                                store: StaticStores.getPrefixOfStore(),
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'code',
                                editable: false,
                                emptyText: 'Select...',
                                anchor: '100%',
                                labelStyle: 'font-weight: 600; color: #7f8c8d; font-size: 11px; letter-spacing: 0.5px;'
                            }]
                        }
                    ],

                    // Bottom Button Bar
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        style: 'background: white; padding: 10px 0 0 0;',
                        items: [
                            '->',
                            {
                                text: 'Clear Form',
                                cls: 'btn-danger',
                                width: 100,
                                handler: function() { this.up('form').reset(); }
                            },
                            {
                                text: 'POST to API',
                                cls: 'btn-success',
                                iconCls: 'x-fa fa-cloud-upload',
                                width: 140,
                                margin: '0 0 0 10',
                                handler: function() {
                                    var form = this.up('form');
                                    if (form.isValid()) {
                                        var values = form.getValues();

                                        // Visual feedback
                                        var btn = this;
                                        btn.setText('Sending...');
                                        btn.disable();

                                        // Mocking the fetch for UI demo purposes (replace with actual fetch in prod)
                                        // fetch('/seventab/api/prefix/create', ... )

                                        setTimeout(function() {
                                            // Simulate Success
                                            Ext.Msg.alert('Success', 'Record created via REST API');
                                            PrefixStoreModule.getStore().load(); // Reload store
                                            form.reset();
                                            btn.setText('POST to API');
                                            btn.enable();
                                        }, 800);
                                    }
                                }
                            }
                        ]
                    }]
                },

                // --- CENTER: JSON VIEWER ---
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'fit',
                    cls: 'grid-enhanced grid-card',
                    style: 'border: 1px solid #e5e7eb; background: white;',
                    bodyCls: 'code-panel-body',

                    tbar: {
                        cls: 'toolbar-card',
                        padding: '10',
                        items: [
                            { xtype: 'component', html: '<div class="toolbar-title"><span class="bar"></span>Live JSON Response</div>' },
                            '->',
                            {
                                text: 'Refresh Data',
                                cls: 'btn-primary',
                                iconCls: 'x-fa fa-refresh',
                                handler: function() { PrefixStoreModule.getStore().load(); }
                            },
                            {
                                text: 'Copy JSON',
                                cls: 'btn-primary',
                                iconCls: 'x-fa fa-copy',
                                style: 'margin-left:5px;',
                                handler: function() {
                                    var el = document.getElementById('jsonDisplayArea');
                                    if(el) {
                                        var range = document.createRange();
                                        range.selectNode(el);
                                        window.getSelection().removeAllRanges();
                                        window.getSelection().addRange(range);
                                        document.execCommand('copy');
                                        window.getSelection().removeAllRanges();
                                        Ext.toast({ html: 'JSON copied to clipboard!', align: 't' });
                                    }
                                }
                            }
                        ]
                    },

                    html: '<div style="padding: 20px; overflow: auto; height: 100%; box-sizing: border-box;">' +
                          '<pre id="jsonDisplayArea" class="code-pre">' +
                          '// Waiting for data...\n// Make sure backend is running.' +
                          '</pre></div>'
                }
            ],

            listeners: {
                activate: function() {
                    var store = PrefixStoreModule.getStore();
                    if (store) {
                        store.load();
                        // Add listener to update JSON when store changes
                        store.on('load', updateJsonDisplay);
                        // Trigger initial update if already loaded
                        if(store.getCount() > 0) updateJsonDisplay();
                    }
                },
                deactivate: function() {
                    var store = PrefixStoreModule.getStore();
                    if(store) store.un('load', updateJsonDisplay);
                }
            }
        };
    }

    return {
        create: createTab
    };
})();