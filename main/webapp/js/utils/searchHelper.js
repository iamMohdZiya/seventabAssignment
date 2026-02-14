
var SearchHelper = (function() {
    function performSearch() {
        var nameVal = Ext.getCmp('searchName').getValue();
        var codeVal = Ext.getCmp('searchCode').getValue();
        var typeVal = Ext.getCmp('searchType').getValue();

        var grid = Ext.getCmp('patientListGrid');
        var store = grid.getStore();

        store.clearFilter();

        var proxy = store.getProxy();

        proxy.setExtraParams({
            name: nameVal || '',
            staffCode: codeVal || '',
            userType: typeVal || ''
        });


        store.loadPage(1);
    }

    return {
        performSearch: performSearch
    };
})();

