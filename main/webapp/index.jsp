<!DOCTYPE html>
<html>
<head>
    <title>Mednet Labs - Training Assignment Application</title>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-triton/resources/theme-triton-all.css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/ext-all.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-triton/theme-triton.js"></script>

    <script type='text/javascript' src='dwr/engine.js'></script>
    <script type='text/javascript' src='dwr/util.js'></script>
    <script type='text/javascript' src='dwr/interface/PrefixService.js'></script>

    <script type="text/javascript">
        // Disable DWR debug mode to prevent console errors
        if (typeof dwr !== 'undefined' && dwr.engine) {
            // Only call setLogEnabled if it exists in this version of DWR
            if (typeof dwr.engine.setLogEnabled === 'function') {
                dwr.engine.setLogEnabled(false);
            }
            dwr.engine.defaultErrorHandler = function(errorString, exception) {
                // Suppress undefined errors - they're not critical
                if (errorString && errorString !== 'undefined') {
                    console.warn('DWR Error: ' + errorString);
                }
            };
        }
    </script>

    <style type="text/css">
        /* --- Global Reset & Typography --- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        :root {
            --primary: #2563eb;
            --primary-600: #1d4ed8;
            --success: #16a34a;
            --danger: #dc2626;
            --warning: #f59e0b;
            --text: #111827;
            --muted: #6b7280;
            --border: #e5e7eb;
            --bg: #f6f7fb;
            --card: #ffffff;
            --hover: #eef2ff;
        }

        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            font-size: 13px;
        }

        /* --- ExtJS Overrides (Clean & Flat) --- */
        .x-tab-bar {
            background-color: #ffffff !important;
            border-bottom: 1px solid var(--border);
            box-shadow: none;
            z-index: 10;
        }
        .x-tab {
            background: transparent !important;
            border: none !important;
            padding: 10px 18px !important;
        }
        .x-tab-active {
            border-bottom: 2px solid var(--primary) !important;
            background: transparent !important;
        }
        .x-tab-inner {
            font-weight: 600 !important;
            color: var(--muted);
            font-size: 13px !important;
        }
        .x-tab-active .x-tab-inner {
            color: var(--text) !important;
        }

        /* Grid Styling */
        .x-grid-body {
            border-width: 0 !important;
            background: white;
        }
        .x-column-header {
            background-color: #f3f4f6 !important;
            background-image: none !important;
            border-right: 1px solid var(--border) !important;
            border-bottom: 1px solid var(--border) !important;
            color: #374151 !important;
            font-weight: 600 !important;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.4px;
            padding: 10px 0 !important;
        }
        .x-grid-row .x-grid-cell {
            color: #1f2937;
            border-color: #eef0f3 !important;
            padding: 10px 10px !important;
            font-size: 13px;
        }
        .x-grid-row-alt .x-grid-cell {
            background-color: #fafbfc !important;
        }
        .x-grid-row-over .x-grid-cell {
            background-color: var(--hover) !important;
        }

        /* --- Panels & Cards --- */
        .search-panel,
        .form-section,
        .grid-enhanced,
        .card,
        .grid-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
        }
        .form-section {
            padding: 20px 24px;
        }
        .grid-card {
            overflow: hidden;
        }
        .app-panel-body {
            background: var(--bg);
        }

        /* --- Inputs --- */
        .x-form-text {
            padding: 8px 10px !important;
            border-radius: 6px !important;
            border-color: #d1d5db !important;
        }
        .x-form-trigger-wrap-default .x-form-trigger {
            border-color: #d1d5db !important;
        }
        .x-form-focus.x-form-text {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
        }

        /* --- Typography --- */
        h3 {
            color: var(--text);
            font-weight: 700;
            margin: 0 0 16px 0;
            font-size: 16px;
        }
        .section-title {
            color: var(--text);
            font-weight: 700;
            margin: 0 0 16px 0;
            font-size: 16px;
        }
        .muted-text {
            color: var(--muted);
            font-size: 13px;
        }

        .x-form-item-label {
            color: #4b5563 !important;
            font-weight: 600 !important;
            font-size: 12px !important;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        /* --- Buttons --- */
        .x-btn {
            border-radius: 6px !important;
            text-transform: none !important;
            font-weight: 600 !important;
            letter-spacing: 0.2px;
            box-shadow: none !important;
        }

        /* Primary Button */
        .btn-primary .x-btn-inner,
        .btn-primary .x-btn-icon-el {
            color: white !important;
        }
        .btn-primary,
        .btn-primary .x-btn-wrap,
        .btn-primary .x-btn-button {
            background: var(--primary) !important;
            background-color: var(--primary) !important;
            background-image: none !important;
            border-color: var(--primary-600) !important;
            color: white !important;
        }
        .btn-primary:hover,
        .btn-primary.x-btn-over,
        .btn-primary.x-btn-focus,
        .btn-primary.x-btn-pressed,
        .btn-primary:hover .x-btn-wrap,
        .btn-primary.x-btn-over .x-btn-wrap,
        .btn-primary.x-btn-focus .x-btn-wrap,
        .btn-primary.x-btn-pressed .x-btn-wrap {
            background: var(--primary-600) !important;
            background-color: var(--primary-600) !important;
            background-image: none !important;
            border-color: var(--primary-600) !important;
        }

        /* Success Button */
        .btn-success .x-btn-inner,
        .btn-success .x-btn-icon-el {
            color: white !important;
        }
        .btn-success,
        .btn-success .x-btn-wrap,
        .btn-success .x-btn-button {
            background: var(--success) !important;
            background-color: var(--success) !important;
            background-image: none !important;
            border-color: #15803d !important;
            color: white !important;
        }
        .btn-success:hover,
        .btn-success.x-btn-over,
        .btn-success.x-btn-focus,
        .btn-success.x-btn-pressed,
        .btn-success:hover .x-btn-wrap,
        .btn-success.x-btn-over .x-btn-wrap,
        .btn-success.x-btn-focus .x-btn-wrap,
        .btn-success.x-btn-pressed .x-btn-wrap {
            background: #15803d !important;
            background-color: #15803d !important;
            background-image: none !important;
            border-color: #15803d !important;
        }

        /* Danger Button */
        .btn-danger .x-btn-inner,
        .btn-danger .x-btn-icon-el {
            color: white !important;
        }
        .btn-danger,
        .btn-danger .x-btn-wrap,
        .btn-danger .x-btn-button {
            background: var(--danger) !important;
            background-color: var(--danger) !important;
            background-image: none !important;
            border-color: #b91c1c !important;
            color: white !important;
        }
        .btn-danger:hover,
        .btn-danger.x-btn-over,
        .btn-danger.x-btn-focus,
        .btn-danger.x-btn-pressed,
        .btn-danger:hover .x-btn-wrap,
        .btn-danger.x-btn-over .x-btn-wrap,
        .btn-danger.x-btn-focus .x-btn-wrap,
        .btn-danger.x-btn-pressed .x-btn-wrap {
            background: #b91c1c !important;
            background-color: #b91c1c !important;
            background-image: none !important;
            border-color: #b91c1c !important;
        }

        /* --- Status Badges --- */
        .status-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            min-width: 80px;
        }
        .status-confirmed { background-color: var(--success); }
        .status-pending { background-color: var(--warning); }
        .status-failed { background-color: var(--danger); }

        /* --- Grid Cell Helpers --- */
        .cell-name {
            font-weight: 600;
            color: #1f2937;
        }
        .cell-code {
            font-family: monospace;
            color: #6b7280;
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
        }
        .cell-muted {
            color: #6b7280;
        }
        .cell-id {
            color: #9ca3af;
        }

        /* --- Badges (Grid Renderers) --- */
        .badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 3px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        .badge--type-staff { background: #2563eb; }
        .badge--type-doctor { background: #dc2626; }
        .badge--type-consultant { background: #d97706; }
        .badge--status-confirmed { background: #16a34a; }
        .badge--status-trainee { background: #2563eb; }
        .badge--status-contract { background: #d97706; }
        .badge--status-probationary { background: #9ca3af; }
        .badge--status-regular { background: #0f766e; }
        .badge--gender-m { background: #2563eb; }
        .badge--gender-f { background: #db2777; }
        .badge--gender-u { background: #9ca3af; }

        /* --- Layout Density Toggles --- */
        .layout-compact .form-section {
            padding: 16px 18px;
        }
        .layout-compact .x-grid-row .x-grid-cell {
            padding: 8px 10px !important;
        }
        .layout-compact .x-column-header {
            padding: 8px 0 !important;
            font-size: 10px;
        }
        .layout-compact h3,
        .layout-compact .section-title {
            font-size: 15px;
        }

        .layout-spacious .form-section {
            padding: 24px 28px;
        }
        .layout-spacious .x-grid-row .x-grid-cell {
            padding: 12px 12px !important;
        }
        .layout-spacious .x-column-header {
            padding: 12px 0 !important;
            font-size: 12px;
        }
        .layout-spacious h3,
        .layout-spacious .section-title {
            font-size: 17px;
        }

        /* --- Utility Classes --- */
        .divider {
            height: 1px;
            background: var(--border);
            margin: 20px 0;
        }
        .note-box {
            background: #eff6ff;
            border: 1px solid #dbeafe;
            border-left: 3px solid var(--primary);
            padding: 12px 14px;
            border-radius: 8px;
            color: #1f2937;
            font-size: 13px;
        }
        .note-title {
            color: var(--primary);
            font-weight: 700;
            display: block;
            margin-bottom: 6px;
        }
        .field-label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: #4b5563;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        .select-input {
            width: 250px;
            padding: 9px 10px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 13px;
            background-color: #fff;
            color: #111827;
            outline: none;
        }
        .select-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
        }
        .select-input.is-disabled {
            background-color: #f3f4f6;
            color: #6b7280;
            cursor: not-allowed;
        }
        .toolbar-card {
            background: #ffffff;
            border-bottom: 1px solid var(--border);
        }
        .toolbar-title {
            font-weight: 700;
            color: var(--text);
            font-size: 14px;
            display: flex;
            align-items: center;
        }
        .toolbar-title .bar {
            width: 3px;
            height: 14px;
            background: var(--primary);
            margin-right: 8px;
            border-radius: 2px;
        }
        .paging-bar {
            background: #ffffff;
            border-top: 1px solid var(--border);
        }
        .empty-state {
            text-align: center;
            padding: 24px;
            color: var(--muted);
        }

        /* --- Modal / Table Helpers --- */
        .modal-window .x-window-header {
            background: #ffffff;
            border-bottom: 1px solid var(--border);
        }
        .modal-window .x-window-body {
            background: var(--bg);
        }
        .pt-table {
            width: 100%;
            border-collapse: collapse;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 13px;
        }
        .pt-row td {
            padding: 10px 0;
            border-bottom: 1px solid #f0f2f5;
        }
        .pt-label {
            width: 140px;
            color: var(--muted);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.4px;
        }
        .pt-value {
            color: var(--text);
            font-weight: 500;
            font-size: 14px;
        }
        .pt-code {
            font-family: monospace;
            color: #374151;
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            display: inline-block;
        }

        /* --- Code Panel --- */
        .code-panel-body {
            background: #0f172a;
        }
        .code-pre {
            font-family: Consolas, "Fira Code", monospace;
            font-size: 12px;
            color: #e2e8f0;
            margin: 0;
        }

        /* --- Feature / Info Cards --- */
        .info-card,
        .feature-card {
            background: #f9fafb;
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 18px;
        }
        .feature-card {
            text-align: left;
            max-width: 860px;
            margin: 0 auto;
        }
        .feature-title {
            margin: 0 0 12px 0;
            color: #1f2937;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 8px;
        }
        .feature-grid {
            display: flex;
            flex-wrap: wrap;
        }
        .feature-item {
            width: 50%;
            padding-right: 15px;
            box-sizing: border-box;
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
        }
        .feature-item i {
            margin-top: 3px;
            margin-right: 8px;
            color: var(--success);
        }
        .feature-item strong {
            color: #374151;
            font-size: 13px;
        }
        .feature-item p {
            margin: 2px 0 0 0;
            color: var(--muted);
            font-size: 12px;
        }

        /* --- Hero Section --- */
        .hero {
            margin-bottom: 24px;
            text-align: center;
        }
        .hero-icon {
            width: 72px;
            height: 72px;
            background: #fef2f2;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
        }
        .hero-title {
            color: var(--text);
            margin: 0 0 8px 0;
            font-size: 20px;
            font-weight: 700;
        }
        .hero-text {
            color: var(--muted);
            font-size: 13px;
            max-width: 620px;
            margin: 0 auto;
            line-height: 1.6;
        }
    </style>

    <script type="text/javascript" src="js/stores/staticStores.js"></script>
    <script type="text/javascript" src="js/stores/prefixStore.js"></script>
    <script type="text/javascript" src="js/utils/searchHelper.js"></script>
    <script type="text/javascript" src="js/tab1.js"></script>
    <script type="text/javascript" src="js/tab2.js"></script>
    <script type="text/javascript" src="js/tab3.js"></script>
    <script type="text/javascript" src="js/tab4.js"></script>
    <script type="text/javascript" src="js/tab5.js"></script>
    <script type="text/javascript" src="js/tab6.js"></script>
    <script type="text/javascript" src="js/tab7.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body></body>
</html>

