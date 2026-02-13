// ===== TAB 3: LIST WITH PAGING & SEARCH =====
var Tab3 = (function() {
    // Debounce timer for search inputs
    var searchDebounceTimer = null;
    var DEBOUNCE_DELAY = 500; // milliseconds

    /**
     * Debounced search function
     */
    function debouncedSearch() {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(function() {
            SearchHelper.performSearch();
        }, DEBOUNCE_DELAY);
    }

    function createTab() {
        return {
            title: 'Tab 3: Staff Directory',
            layout: 'fit',
            style: 'margin: 15px;',
            items: [{
                xtype: 'grid',
                id: 'patientListGrid',
                cls: 'grid-enhanced grid-card',
                columnLines: false,
                style: 'border: 1px solid #e5e7eb; background: white;',

                store: Ext.create('Ext.data.Store', {
                    storeId: 'patientListStore',
                    fields: ['name', 'staffCode', 'userType', 'phone', 'dept', 'status', 'joiningDate'],
                    pageSize: 10,
                    proxy: {
                        type: 'ajax',
                        url: '/seventab/api/staff/search',
                        reader: {
                            type: 'json',
                            rootProperty: 'data',
                            totalProperty: 'totalCount'
                        }
                    },
                    autoLoad: true
                }),

                tbar: {
                    cls: 'toolbar-card',
                    padding: '16 16',
                    items: [
                        {
                            xtype: 'component',
                            html: '<div class="toolbar-title"><span class="bar"></span>Staff Directory</div>',
                            margin: '0 20 0 0'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            id: 'searchName',
                            width: 220,
                            emptyText: 'Search by Name...',
                            cls: 'modern-input',
                            enableKeyEvents: true,
                            listeners: { keyup: debouncedSearch }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id: 'searchCode',
                            width: 150,
                            emptyText: 'Staff Code...',
                            enableKeyEvents: true,
                            listeners: { keyup: debouncedSearch }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'combobox',
                            id: 'searchType',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['type'],
                                data: [{'type': 'Staff'}, {'type': 'Doctor'}, {'type': 'Consultant'}]
                            }),
                            displayField: 'type',
                            valueField: 'type',
                            width: 150,
                            emptyText: 'User Type',
                            queryMode: 'local',
                            editable: false,
                            listeners: { change: function() { SearchHelper.performSearch(); } }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'button',
                            text: 'Clear',
                            cls: 'btn-danger',
                            handler: function() {
                                Ext.getCmp('searchName').reset();
                                Ext.getCmp('searchCode').reset();
                                Ext.getCmp('searchType').reset();
                                SearchHelper.performSearch();
                            }
                        }
                    ]
                },

                columns: [
                    {
                        text: 'NAME',
                        dataIndex: 'name',
                        flex: 2,
                        minWidth: 200,
                        renderer: function(v) { return '<span class="cell-name">' + v + '</span>'; }
                    },
                    {
                        text: 'CODE',
                        dataIndex: 'staffCode',
                        flex: 1,
                        minWidth: 100,
                        renderer: function(v) { return '<span class="cell-code">' + v + '</span>'; }
                    },
                    {
                        text: 'USER TYPE',
                        dataIndex: 'userType',
                        flex: 1,
                        minWidth: 110,
                        renderer: function(value) {
                            var classMap = {
                                'Staff': 'badge--type-staff',
                                'Doctor': 'badge--type-doctor',
                                'Consultant': 'badge--type-consultant'
                            };
                            var cls = classMap[value] || 'badge--type-staff';
                            return '<span class="badge ' + cls + '">' + value + '</span>';
                        }
                    },
                    {
                        text: 'PHONE',
                        dataIndex: 'phone',
                        flex: 1,
                        minWidth: 110,
                        renderer: function(v) { return '<span class="cell-muted">' + v + '</span>'; }
                    },
                    {
                        text: 'DEPARTMENT',
                        dataIndex: 'dept',
                        flex: 1.5,
                        minWidth: 160,
                        renderer: function(v) { return '<span class="cell-muted">' + v + '</span>'; }

                    },
                    {
                        text: 'STATUS',
                        dataIndex: 'status',
                        flex: 1,
                        minWidth: 110,
                        renderer: function(value) {
                            var classMap = {
                                'Confirmed': 'badge--status-confirmed',
                                'Trainee': 'badge--status-trainee',
                                'Contract': 'badge--status-contract',
                                'Probationary': 'badge--status-probationary',
                                'Regular': 'badge--status-regular'
                            };
                            var cls = classMap[value] || 'badge--status-probationary';
                            return '<span class="badge ' + cls + '">' + value + '</span>';
                        }
                    },
                    {
                        text: 'JOINING DATE',
                        dataIndex: 'joiningDate',
                        flex: 1,
                        minWidth: 110
                    }
                ],

                bbar: {
                    xtype: 'pagingtoolbar',
                    store: 'patientListStore',
                    displayInfo: true,
                    displayMsg: '<span class="muted-text">Displaying {0} - {1} of {2}</span>',
                    emptyMsg: '<span class="muted-text">No records found</span>',
                    cls: 'paging-bar'
                }
            }]
        };
    }

    return {
        create: createTab
    };
})();