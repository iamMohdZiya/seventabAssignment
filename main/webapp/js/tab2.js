// ===== TAB 2: POPUP WITH HTML EDITOR =====
var Tab2 = (function() {
    function showPatientPopup() {
        Ext.create('Ext.window.Window', {
            title: 'Patient Details & Notes',
            width: 900,
            height: 700,
            layout: 'border',
            modal: true,
            resizable: true,
            draggable: true,
            cls: 'modal-window',
            style: 'border-radius: 10px; overflow: hidden;',
            bodyStyle: 'background: #f6f7fb;',

            items: [
                // --- TOP REGION: PATIENT DETAILS ---
                {
                    region: 'north',
                    height: 280,
                    bodyPadding: '20 30',
                    scrollable: true,
                    style: 'border-bottom: 1px solid #e5e7eb; background: #ffffff;',
                    html: '' +
                        '<div class="section-title" style="margin-bottom:12px;">Patient Information</div>' +
                        '<table class="pt-table">' +
                            '<tr class="pt-row"><td class="pt-label">Patient Name</td><td class="pt-value">John Doe</td></tr>' +
                            '<tr class="pt-row"><td class="pt-label">MRN</td><td class="pt-value"><span class="pt-code">MRN-2024-001</span></td></tr>' +
                            '<tr class="pt-row"><td class="pt-label">Date Of Birth</td><td class="pt-value">15-01-1990 <span class="muted-text">(34 Years)</span></td></tr>' +
                            '<tr class="pt-row"><td class="pt-label">Gender</td><td class="pt-value">Male</td></tr>' +
                            '<tr class="pt-row"><td class="pt-label">Address</td><td class="pt-value">123 Medical Lane, Healthcare City, NY 10012</td></tr>' +
                            '<tr class="pt-row"><td class="pt-label">Registration</td><td class="pt-value">10-Feb-2024</td></tr>' +
                            '<tr class="pt-row"><td class="pt-label">Status</td><td class="pt-value"><span class="status-badge status-confirmed">Active</span></td></tr>' +
                        '</table>'
                },

                // --- CENTER REGION: EDITOR ---
                {
                    region: 'center',
                    xtype: 'panel',
                    title: 'Medical Notes & Observations',
                    layout: 'fit',
                    margin: '15',
                    cls: 'grid-enhanced',
                    bodyStyle: 'border: 1px solid #e5e7eb; border-radius: 6px;',
                    items: [
                        {
                            xtype: 'htmleditor',
                            value: '' +
                                '<div style="font-family: sans-serif; color: #1f2937;">' +
                                    '<p><strong>Investigations Requested:</strong></p>' +
                                    '<ul>' +
                                        '<li>CT SCAN</li>' +
                                        '<li>CYTOLOGY</li>' +
                                        '<li>DIGITAL X-RAY</li>' +
                                        '<li>FLUID EXAMINATION</li>' +
                                        '<li>GASTROENTEROLOGY INVESTIGATION</li>' +
                                        '<li>HAEMATOLOGY</li>' +
                                    '</ul>' +
                                '</div>',
                            enableColors: false,
                            enableAlignments: false
                        }
                    ]
                }
            ],

            // --- FOOTER BUTTONS ---
            buttons: [
                {
                    text: 'Close',
                    cls: 'btn-danger',
                    width: 100,
                    handler: function() {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
    }

    function createTab() {
        return {
            title: 'Tab 2: Popup',
            layout: 'vbox',
            cls: 'form-section',
            style: 'margin: 15px;',
            defaults: { width: '100%' },
            items: [
                {
                    xtype: 'component',
                    html: '<h3>Patient Details Popup with Editor</h3>'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            html: '<p class="muted-text" style="margin-bottom: 16px;">Click the button below to view the patient demographic details modal and access the rich text editor for medical notes.</p>'
                        },
                        {
                            xtype: 'button',
                            text: 'Open Patient Details',
                            cls: 'btn-primary',
                            scale: 'medium',
                            width: 250,
                            height: 44,
                            handler: showPatientPopup
                        }
                    ]
                },

                // --- FOOTER FEATURES LIST ---

            ]
        };
    }

    return {
        create: createTab
    };
})();