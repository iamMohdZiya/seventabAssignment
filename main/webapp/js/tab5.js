// ===== TAB 5: EXCEL UPLOAD & DOWNLOAD =====
var Tab5 = (function() {
    function createTab() {
        return {
            title: 'Tab 5: Excel',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                store: PrefixStoreModule.getStore(),
                cls: 'grid-enhanced',
                columnLines: true,
                viewConfig: {
                    stripeRows: true,
                    emptyText: 'No records found. Upload an Excel file to add data.',
                    deferEmptyText: false,
                    trackOver: true
                },
                columns: [
                    { text: 'ID', dataIndex: 'id', width: 60, align: 'center', sortable: true },
                    { text: 'Prefix Name', dataIndex: 'prefixName', flex: 1, minWidth: 140, sortable: true },
                    { text: 'Gender', dataIndex: 'gender', flex: 1, minWidth: 100, sortable: true },
                    { text: 'Prefix Of', dataIndex: 'prefixOf', flex: 1.5, minWidth: 160, sortable: true }
                ],
                tbar: [
                    {
                        text: ' Download Data',
                        iconCls: 'x-fa fa-download',
                        tooltip: 'Download all current data as Excel file',
                        cls: 'btn-primary',
                        scale: 'medium',
                        handler: function() {
                            window.location = '/seventab/api/excel/download';
                        }
                    },
                    {
                        text: ' Download Template',
                        iconCls: 'x-fa fa-file-excel-o',
                        tooltip: 'Download blank Excel template for uploading',
                        cls: 'btn-primary',
                        scale: 'medium',
                        handler: function() {
                            window.location = '/seventab/api/excel/template';
                        }
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'filefield',
                        name: 'excelFile',
                        buttonText: ' Upload Excel',
                        buttonConfig: {
                            iconCls: 'x-fa fa-upload',
                            cls: 'btn-success',
                            scale: 'medium'
                        },
                        tooltip: 'Upload a completed Excel template (.xlsx)',
                        buttonOnly: true,
                        hideLabel: true,
                        listeners: {
                            change: function(field, value) {
                                var fileInput = field.fileInputEl.dom;
                                if (fileInput.files.length > 0) {
                                    var formData = new FormData();
                                    formData.append('file', fileInput.files[0]);

                                    Ext.Msg.wait('Uploading Excel file...', 'Please wait');
                                    fetch('/seventab/excel/upload', {
                                        method: 'POST',
                                        body: formData
                                    })
                                    .then(response => response.text())
                                    .then(data => {
                                        Ext.Msg.close();
                                        Ext.Msg.alert('Success', 'Excel uploaded successfully! New records have been added.');
                                        PrefixStoreModule.getStore().load();
                                        field.reset();
                                    })
                                    .catch(error => {
                                        Ext.Msg.close();
                                        Ext.Msg.alert('Error', 'Failed to upload Excel file: ' + error);
                                    });
                                }
                            }
                        }
                    },
                    '->',
                    {
                        text: ' Refresh',
                        iconCls: 'x-fa fa-refresh',
                        tooltip: 'Reload grid data from server',
                        cls: 'btn-primary',
                        scale: 'medium',
                        handler: function() {
                            PrefixStoreModule.getStore().load();
                        }
                    }
                ]
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
