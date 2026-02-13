// ===== TAB 5: EXCEL UPLOAD & DOWNLOAD =====
var Tab5 = (function() {
    function createTab() {
        return {
            title: 'Tab 5: Excel Manager',
            layout: 'fit',
            style: 'margin: 15px;',

            items: [{
                xtype: 'grid',
                store: PrefixStoreModule.getStore(),
                cls: 'grid-enhanced grid-card',
                style: 'border: 1px solid #e5e7eb; background: white;',
                bodyStyle: 'border: none;',

                columnLines: false,

                viewConfig: {
                    stripeRows: true,
                    emptyText: '<div class="empty-state">No records found. Upload an Excel file to add data.</div>',
                    deferEmptyText: false,
                    trackOver: true
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
                        renderer: function(v) { return '<span class="cell-name">' + v + '</span>'; }
                    },
                    {
                        text: 'GENDER',
                        dataIndex: 'gender',
                        flex: 1,
                        minWidth: 100,
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
                    }
                ],

                tbar: {
                    padding: '12 15',
                    cls: 'toolbar-card',
                    items: [
                        {
                            xtype: 'component',
                            html: '<div class="toolbar-title"><span class="bar"></span>Actions</div>'
                        },
                        {
                            text: 'Download Data',
                            iconCls: 'x-fa fa-download',
                            cls: 'btn-primary',
                            handler: function() {
                                window.location = '/seventab/api/excel/download';
                            }
                        },
                        {
                            text: 'Get Template',
                            iconCls: 'x-fa fa-file-excel-o',
                            cls: 'btn-primary',
                            style: 'margin-left: 5px;',
                            handler: function() {
                                window.location = '/seventab/api/excel/template';
                            }
                        },
                        '->',
                        {
                            xtype: 'tbseparator',
                            style: 'border-color: #e5e7eb; height: 20px; margin: 0 10px;'
                        },
                        {
                            xtype: 'form',
                            itemId: 'excelUploadForm',
                            enctype: 'multipart/form-data',
                            layout: 'hbox',
                            border: false,
                            bodyPadding: 0,
                            style: 'background: transparent;',
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'file',
                                    buttonText: 'Select File...',
                                    buttonConfig: {
                                        iconCls: 'x-fa fa-folder-open',
                                        cls: 'btn-primary'
                                    },
                                    buttonOnly: true,
                                    hideLabel: true,
                                    allowBlank: false,
                                    margin: '0 5 0 0',
                                    listeners: {
                                        change: function(fld, value) {
                                            // Optional: visual feedback could go here, but keeping strict to logic
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Upload',
                                    cls: 'btn-success', // Green for action
                                    iconCls: 'x-fa fa-upload',
                                    handler: function(btn) {
                                        var form = btn.up('form').getForm();
                                        if (form.isValid()) {
                                            form.submit({
                                                url: '/seventab/api/excel/upload',
                                                waitMsg: 'Processing Excel file...',
                                                success: function() {
                                                    Ext.Msg.alert('Success', 'Excel uploaded successfully! New records have been added.');
                                                    PrefixStoreModule.getStore().load();
                                                    form.reset();
                                                },
                                                failure: function(form, action) {
                                                    var result = action && action.result ? action.result : null;
                                                    var message = result && result.message ? result.message : (action && action.response && action.response.responseText ? action.response.responseText : 'Upload failed.');
                                                    if (result && result.errors && result.errors.length) {
                                                        message += '<br/><br/>' + result.errors.join('<br/>');
                                                    }
                                                    Ext.Msg.alert('Error', message);
                                                }
                                            });
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tbseparator',
                            style: 'border-color: #e5e7eb; height: 20px; margin: 0 10px;'
                        },
                        {
                            text: 'Refresh',
                            iconCls: 'x-fa fa-refresh',
                            cls: 'btn-primary',
                            handler: function() {
                                PrefixStoreModule.getStore().load();
                            }
                        }
                    ]
                }
            }],
            listeners: {
                activate: function() {
                    PrefixStoreModule.getStore().load();
                }
            }
        };
    }

    return {
        create: createTab
    };
})();