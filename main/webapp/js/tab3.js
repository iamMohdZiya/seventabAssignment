// ===== TAB 3: LIST WITH PAGING & SEARCH =====
var Tab3 = (function() {
    function getSampleData() {
        return [
            { name: 'Ms. ABEENA JOSEPH', staffCode: 'M11352', userType: 'Staff', phone: '0000000000', dept: 'NURSING', status: 'Confirmed', joiningDate: '01-01-2022' },
            { name: 'Dr. ABHIJITH PB', staffCode: 'M11326', userType: 'Doctor', phone: '0000000000', dept: 'RADIATION ONCOLOGY', status: 'Confirmed', joiningDate: '19-01-2022' },
            { name: 'Mr. ABHIJITH VP', staffCode: 'S53011', userType: 'Staff', phone: '0000000000', dept: 'OUTSOURCE MAINTENANCE', status: 'Trainee', joiningDate: '-' },
            { name: 'Dr. ABHISHEK JAIN', staffCode: 'S50001', userType: 'Doctor', phone: '0000000000', dept: 'ULTRASOUND', status: 'Confirmed', joiningDate: '01-01-2022' },
            { name: 'Dr. ABHISHEK VAIDYA', staffCode: 'CONSAB3461', userType: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mr. ABHISHEK VAIDYA1', staffCode: 'CONSAB34611', userType: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mr. ABHISHEK VAIDYA2', staffCode: 'CONSAB34612', userType: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mrs. ABIGAIL GUPTA', staffCode: '112345678', userType: 'Consultant', phone: '1234123412', dept: 'NURSING', status: 'Regular', joiningDate: '03-09-2023' },
            { name: 'Mr. ABIN DEV T', staffCode: 'M11535', userType: 'Staff', phone: '0000000000', dept: 'INSURANCE', status: 'Confirmed', joiningDate: '05-08-2022' },
            { name: 'Mr. ABIN JOSE', staffCode: '007', userType: 'Staff', phone: '0000000000', dept: 'PHYSIOTHERAPY', status: 'Confirmed', joiningDate: '15-07-2021' },
            { name: 'Mr. ABIN JOSE2', staffCode: '00722', userType: 'Staff', phone: '0000000000', dept: 'PHYSIOTHERAPY', status: 'Confirmed', joiningDate: '15-07-2021' },
            { name: 'Mr. ABIN K', staffCode: 'S50005', userType: 'Staff', phone: '0000000000', dept: 'ATTENDER', status: 'Probationary', joiningDate: '-' },
            { name: 'Mr. ABIN SURI', staffCode: 'M12', userType: 'Staff', phone: '0000000000', dept: 'RADIOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mr. ABINAAA2 DEV T', staffCode: 'M11535222', userType: 'Staff', phone: '0000000000', dept: 'INSURANCE', status: 'Trainee', joiningDate: '05-08-2022' },
            { name: 'Dr. ABRAHAM KHAN', staffCode: 'M11738', userType: 'Staff', phone: '0000000000', dept: 'PATHOLOGY', status: 'Contract', joiningDate: '01-02-2023' },
            { name: 'Ms. ZARA ALI', staffCode: 'Z100', userType: 'Staff', phone: '1234567890', dept: 'IT', status: 'Confirmed', joiningDate: '01-05-2023' },
            { name: 'Dr. YASH MALHOTRA', staffCode: 'Y200', userType: 'Doctor', phone: '9876543210', dept: 'CARDIOLOGY', status: 'Confirmed', joiningDate: '10-06-2022' },
            { name: 'Mr. XAVIER P', staffCode: 'X300', userType: 'Consultant', phone: '5555555555', dept: 'NEUROLOGY', status: 'Contract', joiningDate: '20-08-2023' },
            { name: 'Mrs. VIJAYALAKSHMI', staffCode: 'V400', userType: 'Staff', phone: '4444444444', dept: 'NURSING', status: 'Confirmed', joiningDate: '12-12-2021' },
            { name: 'Dr. UMA SHANKAR', staffCode: 'U500', userType: 'Doctor', phone: '3333333333', dept: 'ORTHO', status: 'Confirmed', joiningDate: '14-02-2022' },
            { name: 'Mr. TARUN KUMAR', staffCode: 'T600', userType: 'Staff', phone: '2222222222', dept: 'PHARMACY', status: 'Trainee', joiningDate: '01-11-2023' },
            { name: 'Ms. SARA JONES', staffCode: 'S700', userType: 'Staff', phone: '1111111111', dept: 'FRONT OFFICE', status: 'Confirmed', joiningDate: '05-05-2022' },
            { name: 'Dr. RAHUL DRAVID', staffCode: 'R800', userType: 'Doctor', phone: '0000000000', dept: 'PEDIATRICS', status: 'Confirmed', joiningDate: '09-09-2021' },
            { name: 'Mr. QUINCY ADAMS', staffCode: 'Q900', userType: 'Consultant', phone: '9999999999', dept: 'UROLOGY', status: 'Regular', joiningDate: '01-01-2024' },
            { name: 'Mrs. PRIYA SHARMA', staffCode: 'P1000', userType: 'Staff', phone: '8888888888', dept: 'HR', status: 'Confirmed', joiningDate: '15-03-2023' },
            { name: 'Dr. OMAR ABDULLAH', staffCode: 'O1100', userType: 'Doctor', phone: '7777777777', dept: 'ENT', status: 'Confirmed', joiningDate: '18-04-2022' }
        ];
    }

    function createTab() {
        return {
            title: 'Tab 3: Staff Directory',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                id: 'patientListGrid',
                cls: 'staff-grid-enhanced grid-enhanced',
                columnLines: true,
                viewConfig: {
                    stripeRows: true,
                    trackOver: true,
                    getRowClass: function(record) {
                        return 'grid-row-highlight';
                    }
                },
                store: Ext.create('Ext.data.Store', {
                    storeId: 'patientListStore',
                    fields: ['name', 'staffCode', 'userType', 'phone', 'dept', 'status', 'joiningDate'],
                    pageSize: 10,
                    proxy: {
                        type: 'memory',
                        enablePaging: true,
                        reader: { type: 'json' }
                    },
                    data: getSampleData()
                }),
                tbar: [{
                    xtype: 'container',
                    layout: 'vbox',
                    padding: '10 10',
                    style: 'background: #f8fafb; border-bottom: 2px solid #3498db; border-radius: 4px;',
                    items: [
                        {
                            xtype: 'label',
                            text: '🔍 Advanced Search & Filters',
                            style: 'font-weight: bold; font-size: 13px; color: #2c3e50; margin-bottom: 10px;'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            spacing: 15,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Name',
                                            style: 'font-size: 11px; color: #555; margin-bottom: 3px; font-weight: bold;'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'searchName',
                                            width: 180,
                                            emptyText: 'Search by name...',
                                            enableKeyEvents: true,
                                            style: 'border-radius: 4px;',
                                            listeners: {
                                                keyup: function() { SearchHelper.performSearch(); }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Code',
                                            style: 'font-size: 11px; color: #555; margin-bottom: 3px; font-weight: bold;'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'searchCode',
                                            width: 140,
                                            emptyText: 'Search by code...',
                                            enableKeyEvents: true,
                                            style: 'border-radius: 4px;',
                                            listeners: {
                                                keyup: function() { SearchHelper.performSearch(); }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Type',
                                            style: 'font-size: 11px; color: #555; margin-bottom: 3px; font-weight: bold;'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'searchType',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['type'],
                                                data: [
                                                    {'type': 'Staff'},
                                                    {'type': 'Doctor'},
                                                    {'type': 'Consultant'}
                                                ]
                                            }),
                                            displayField: 'type',
                                            valueField: 'type',
                                            width: 140,
                                            emptyText: 'All Types',
                                            queryMode: 'local',
                                            editable: false,
                                            style: 'border-radius: 4px;',
                                            listeners: {
                                                change: function() { SearchHelper.performSearch(); }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    text: '🔄 Clear Filters',
                                    iconCls: 'x-fa fa-eraser',
                                    style: 'background: #95a5a6; color: white; border: none; border-radius: 4px; font-weight: bold; margin-top: 18px;',
                                    handler: function() {
                                        Ext.getCmp('searchName').reset();
                                        Ext.getCmp('searchCode').reset();
                                        Ext.getCmp('searchType').reset();
                                        SearchHelper.performSearch();
                                    }
                                }
                            ]
                        }
                    ]
                }],
                columns: [
                    { text: 'Name', dataIndex: 'name', flex: 2, minWidth: 200, style: 'font-weight: 600; background-color: #f5f5f5;' },
                    { text: 'Code', dataIndex: 'staffCode', flex: 1, minWidth: 100, style: 'font-weight: 600; background-color: #f5f5f5;' },
                    { text: 'User Type', dataIndex: 'userType', flex: 1, minWidth: 90, style: 'font-weight: 600; background-color: #f5f5f5;', renderer: function(value) {
                        var colors = {'Staff': '#3498db', 'Doctor': '#e74c3c', 'Consultant': '#f39c12'};
                        return '<span style="background-color: ' + colors[value] + '; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">' + value + '</span>';
                    }},
                    { text: 'Phone', dataIndex: 'phone', flex: 1, minWidth: 110, style: 'font-weight: 600; background-color: #f5f5f5;' },
                    { text: 'Department', dataIndex: 'dept', flex: 1.5, minWidth: 160, style: 'font-weight: 600; background-color: #f5f5f5;' },
                    { text: 'Status', dataIndex: 'status', flex: 1, minWidth: 90, style: 'font-weight: 600; background-color: #f5f5f5;', renderer: function(value) {
                        var statusColors = {'Confirmed': '#27ae60', 'Trainee': '#3498db', 'Contract': '#e67e22', 'Probationary': '#95a5a6', 'Regular': '#16a085'};
                        return '<span style="background-color: ' + statusColors[value] + '; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">' + value + '</span>';
                    }},
                    { text: 'Joining Date', dataIndex: 'joiningDate', flex: 1, minWidth: 110, style: 'font-weight: 600; background-color: #f5f5f5;' }
                ],
                viewConfig: {
                    stripeRows: true,
                    getRowClass: function(record) {
                        return 'grid-row-highlight';
                    }
                },
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: 'patientListStore',
                    displayInfo: true,
                    displayMsg: 'Records {0} - {1} of {2}',
                    emptyMsg: "No records found"
                }
            }]
        };
    }

    return {
        create: createTab
    };
})();

