// ===== TAB 7: PDF GENERATION (PUPPETEER) =====
var Tab7 = (function() {
    function createTab() {
        return {
            title: 'Tab 7: PDF Generator',
            layout: 'vbox',
            bodyPadding: 20,
            defaults: { padding: 15 },
            items: [
                {
                    xtype: 'container',
                    html: '<h3 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 12px; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">📄 PDF Generation with Puppeteer</h3>' +
                          '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 10px 0 0 0;"><strong>Puppeteer</strong> is a powerful Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.</p>' +
                          '<p style="color: #666; font-size: 12px; margin: 8px 0 0 0;"><em>✨ Click the buttons below to generate and download a "Hello World" PDF or download a pre-generated example.</em></p>',
                    height: 130
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height: 70,
                    margin: '10 0 0 0',
                    spacing: 15,
                    items: [
                        {
                            xtype: 'button',
                            text: '⚙️ Generate & Download PDF',
                            iconCls: 'x-fa fa-file-pdf-o',
                            scale: 'large',
                            width: 280,
                            style: 'background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);',
                            handler: function() {
                                Ext.Msg.wait('⏳ Generating PDF...', 'Processing');
                                window.location = '/seventab/api/pdf/generate';
                                setTimeout(function() {
                                    Ext.Msg.close();
                                }, 2000);
                            }
                        },
                        {
                            xtype: 'button',
                            text: '⬇️ Download Sample PDF',
                            iconCls: 'x-fa fa-download',
                            scale: 'large',
                            width: 260,
                            style: 'background: #27ae60; color: white; border: none; border-radius: 6px; font-weight: bold; box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);',
                            handler: function() {
                                window.location = '/seventab/api/pdf/download';
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    html: '<div style="margin-top: 20px; padding: 15px; background: #f8fafb; border-left: 4px solid #3498db; border-radius: 4px;"><strong style="color: #2c3e50; display: block; margin-bottom: 10px;">✨ Key Features:</strong>' +
                          '<ul style="margin: 0; padding-left: 20px; color: #555; font-size: 13px; line-height: 1.8;">' +
                          '<li>🔄 <strong>Dynamic HTML to PDF</strong> - Convert any HTML content to professional PDF</li>' +
                          '<li>📝 <strong>Template Support</strong> - Generate "Hello World" sample PDFs</li>' +
                          '<li>💾 <strong>Easy Download</strong> - Download both generated and pre-generated PDFs</li>' +
                          '<li>🎨 <strong>Professional Rendering</strong> - High-quality output with proper styling</li>' +
                          '<li>⚡ <strong>Fast Processing</strong> - Quick generation using Puppeteer browser automation</li>' +
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

