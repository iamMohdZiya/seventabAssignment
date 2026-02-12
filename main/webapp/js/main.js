// ===== MAIN APPLICATION ENTRY POINT =====
Ext.onReady(function() {
    // Create the main tab panel with all tabs
    Ext.create('Ext.tab.Panel', {
        renderTo: document.body,
        width: '100%',
        height: '100%',
        cls: 'main-app-panel',
        tabBar: {
            cls: 'main-tab-bar',
            style: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-bottom: 3px solid #667eea;'
        },
        defaults: { bodyPadding: 15, style: 'background-color: #f5f5f5;' },
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

