// ===== TAB 7: PDF GENERATION (PUPPETEER) =====
var Tab7 = (function() {
    function createTab() {
        return {
            title: 'Tab 7: PDF Generator',
            layout: 'vbox',
            cls: 'form-section',
            style: 'margin: 15px;',

            // Center content vertically and horizontally for a "Tool" feel
            bodyPadding: '40 60',
            defaults: {
                width: '100%',
                style: 'text-align: center;' // Center text by default
            },

            items: [
                // --- HERO HEADER ---
                {
                    xtype: 'component',
                    html: '' +
                        '<div class="hero">' +
                            '<div class="hero-icon">' +
                                '<i class="x-fa fa-file-pdf-o" style="font-size: 32px; color: #dc2626;"></i>' +
                            '</div>' +
                            '<div class="hero-title">PDF Generation Service</div>' +
                            '<p class="hero-text">' +
                                'Use Puppeteer (Node.js) to convert HTML templates into professional PDF documents directly from the browser.' +
                            '</p>' +
                        '</div>'
                },

                // --- ACTION BUTTONS ---
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center' // Center the buttons
                    },
                    margin: '0 0 40 0',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Generate New PDF',
                            iconCls: 'x-fa fa-magic',
                            scale: 'medium',
                            height: 44,
                            width: 200,
                            cls: 'btn-danger', // Red for PDF actions usually
                            style: 'margin-right: 20px;',
                            handler: function() {
                                Ext.Msg.wait('Generating PDF Document...', 'Puppeteer Processing');
                                Ext.Ajax.request({
                                    url: '/seventab/api/pdf/generate',
                                    method: 'GET',
                                    success: function(response) {
                                        Ext.Msg.close();
                                        var payload;
                                        try {
                                            payload = Ext.decode(response.responseText);
                                        } catch (e) {
                                            payload = { message: 'PDF generated successfully.' };
                                        }
                                        var fileName = payload.fileName ? ('<br><br><b>Saved as:</b> ' + payload.fileName) : '';
                                        Ext.Msg.alert('PDF Generated', payload.message + fileName);
                                    },
                                    failure: function(response) {
                                        Ext.Msg.close();
                                        var message = response.responseText || 'PDF generation failed.';
                                        Ext.Msg.alert('Error', message);
                                    }
                                });
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Download Sample',
                            iconCls: 'x-fa fa-download',
                            scale: 'medium',
                            height: 44,
                            width: 200,
                            cls: 'btn-success', // Green for safe download
                            handler: function() {
                                window.location = '/seventab/api/pdf/download';
                            }
                        }
                    ]
                },

                // --- FEATURE LIST (Styled Box) ---
                {
                    xtype: 'container',
                    html: '' +
                        '<div class="feature-card">' +
                            '<div class="feature-title">Core Capabilities</div>' +
                            '<div class="feature-grid">' +
                                '<div class="feature-item">' +
                                    '<i class="x-fa fa-check"></i>' +
                                    '<div>' +
                                        '<strong>Dynamic Rendering</strong>' +
                                        '<p>Convert live HTML/CSS to PDF instantly.</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="feature-item">' +
                                    '<i class="x-fa fa-check"></i>' +
                                    '<div>' +
                                        '<strong>High Fidelity</strong>' +
                                        '<p>Pixel-perfect Chrome engine rendering.</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="feature-item">' +
                                    '<i class="x-fa fa-check"></i>' +
                                    '<div>' +
                                        '<strong>Template Support</strong>' +
                                        '<p>Supports Handlebars/EJS injection.</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="feature-item">' +
                                    '<i class="x-fa fa-check"></i>' +
                                    '<div>' +
                                        '<strong>Automated Reports</strong>' +
                                        '<p>Ideal for invoices and lab results.</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();