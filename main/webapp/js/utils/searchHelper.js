// ===== HELPER FUNCTION: UNIFIED SEARCH =====
var SearchHelper = (function() {
    function performSearch() {
        var nameVal = Ext.getCmp('searchName').getValue();
        var codeVal = Ext.getCmp('searchCode').getValue();
        var typeVal = Ext.getCmp('searchType').getValue();

        var grid = Ext.getCmp('patientListGrid');
        var store = grid.getStore();

        // Clear existing filters
        store.clearFilter();

        // Get the proxy and update its extra params
        var proxy = store.getProxy();

        // Set filter parameters to be sent to backend
        proxy.setExtraParams({
            name: nameVal || '',
            staffCode: codeVal || '',
            userType: typeVal || ''
        });

        // Reload from first page
        store.loadPage(1);
    }

    return {
        performSearch: performSearch
    };
})();

