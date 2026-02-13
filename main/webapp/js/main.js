// ===== MAIN APPLICATION ENTRY POINT =====
Ext.onReady(function() {
    document.body.classList.add('layout-compact');

    // Create the main tab panel with all tabs
    Ext.create('Ext.tab.Panel', {
        renderTo: document.body,
        width: '100%',
        height: '100%',
        cls: 'main-app-panel',

        // UI: Clean navigation bar
        tabBar: {
            cls: 'main-tab-bar'
        },

        // UI: Consistent background and padding
        defaults: {
            bodyPadding: 20,
            bodyCls: 'app-panel-body'
        },

        items: [
            Tab1.create(),
            Tab2.create(),
            Tab3.create(),
            Tab4.create(),
            Tab5.create(),
            Tab6.create(),
            Tab7.create()
        ]
    });
});