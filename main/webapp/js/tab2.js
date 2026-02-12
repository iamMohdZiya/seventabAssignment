// ===== TAB 2: POPUP WITH HTML EDITOR =====
var Tab2 = (function() {
    function showPatientPopup() {
        Ext.create('Ext.window.Window', {
            title: '👤 Patient Details & Notes',
            width: 850,
            height: 650,
            layout: 'border',
            modal: true,
            resizable: true,
            style: 'box-shadow: 0 4px 16px rgba(0,0,0,0.15);',
            cls: 'custom-window',
            items: [
                {
                    region: 'north',
                    height: 240,
                    bodyPadding: 20,
                    scrollable: true,
                    style: 'background: #ffffff; border-bottom: 2px solid #3498db;',
                    html: '<table style="width:100%; border-collapse: separate; border-spacing: 0 12px; font-family: sans-serif; font-size: 13px;">' +
                          '<tr><td style="width:140px; font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Name</td><td style="width:15px;">:</td><td style="color: #555;">John Doe</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> MRN</td><td>:</td><td style="color: #555;">MRN-2024-001</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Date Of Birth</td><td>:</td><td style="color: #555;">15-01-1990</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Age</td><td>:</td><td style="color: #555;">34 years</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Gender</td><td>:</td><td style="color: #555;">Male</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Address</td><td>:</td><td style="color: #555;">123 Medical Lane, Healthcare City</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Reg Date</td><td>:</td><td style="color: #555;">10-02-2024</td></tr>' +
                          '<tr><td style="font-weight: bold; color: #2c3e50; padding: 8px 0;"><span style="color: #3498db;">●</span> Status</td><td>:</td><td><span style="background-color: #27ae60; color: white; padding: 3px 8px; border-radius: 12px; font-weight: bold; font-size: 11px;">Active</span></td></tr>' +
                          '</table>'
                },
                {
                    region: 'center',
                    xtype: 'htmleditor',
                    title: '📝 Medical Notes',
                    margin: '5 0 0 0',
                    value: 'CT SCAN, CYTOLOGY, DIGITAL X-RAY, FLUID EXAMINATION, GASTROENTEROLOGY INVESTIGATION, HAEMATOLOGY, HARMONES, HISTOPATHOLOGY, IMMUNO ASSAYS'
                }
            ],
            buttons: [
                {
                    text: '✓ Close',
                    iconCls: 'x-fa fa-close',
                    style: 'background: #95a5a6; color: white; border: none; border-radius: 4px; font-weight: bold;',
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
            defaults: { padding: 15 },
            items: [
                {
                    xtype: 'container',
                    html: '<h3 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 12px; margin: 0; font-size: 16px; font-weight: 600;">Patient Details Popup with Editor</h3>',
                    height: 40
                },
                {
                    xtype: 'button',
                    text: '🔓 Open Patient Details',
                    iconCls: 'x-fa fa-folder-open',
                    scale: 'medium',
                    style: 'background: #3498db; color: white; border: none; border-radius: 4px; font-weight: bold; box-shadow: 0 2px 6px rgba(52, 152, 219, 0.25);',
                    width: 280,
                    height: 40,
                    margin: '20 0 0 0',
                    handler: showPatientPopup
                },
                {
                    xtype: 'container',
                    html: '<div style="margin-top: 30px; padding: 15px; background: #f8fafb; border-left: 4px solid #3498db; border-radius: 4px; color: #555; font-size: 13px; line-height: 1.8;"><strong style="color: #2c3e50; display: block; margin-bottom: 10px;">✨ Features:</strong>' +
                          '<ul style="margin: 0; padding-left: 20px;">' +
                          '<li>Modal popup displaying patient information</li>' +
                          '<li>Rich HTML editor with formatting toolbar (Bold, Italic, Underline, Lists, etc.)</li>' +
                          '<li>Professional data presentation with styled table</li>' +
                          '<li>Status badge for patient status</li>' +
                          '<li>Resizable popup window</li>' +
                          '</ul></div>',
                    flex: 1
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();

