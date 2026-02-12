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

    <!-- DWR Configuration -->
    <script type="text/javascript">
        // Disable DWR debug mode to prevent console errors
        if (typeof dwr !== 'undefined' && dwr.engine) {
            dwr.engine.setLogEnabled(false);
            dwr.engine.defaultErrorHandler = function(errorString, exception) {
                // Suppress undefined errors - they're not critical
                if (errorString && errorString !== 'undefined') {
                    console.warn('DWR Error: ' + errorString);
                }
            };
        }
    </script>

    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #2c3e50;
        }
        .x-tab-default { background: #3498db; }
        .x-tab { border: none; }
        .tab-title { font-weight: 600; color: #2c3e50; font-size: 14px; }
        .search-panel {
            background: #f8fafb;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-left: 4px solid #3498db;
        }
        .form-section {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
            margin-bottom: 15px;
            border-top: 3px solid #3498db;
        }
        .grid-enhanced {
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .grid-enhanced .x-grid-row { background-color: #ffffff; border-bottom: 1px solid #f0f0f0; }
        .grid-enhanced .x-grid-row-striped { background-color: #f8fafb; }
        .grid-enhanced .x-column-header { background: #f5f7fa; font-weight: 600; color: #2c3e50; border: 1px solid #e8ecf1; }
        .grid-enhanced .x-grid-cell { border-color: #f0f0f0; padding: 10px 8px; }
        .btn-success {
            background: #27ae60 !important;
            color: white !important;
            border: none !important;
            border-radius: 5px !important;
            font-weight: 600 !important;
            box-shadow: 0 2px 6px rgba(39, 174, 96, 0.25) !important;
            padding: 6px 12px !important;
            transition: all 0.3s ease !important;
        }
        .btn-success:hover {
            background: #229954 !important;
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.35) !important;
            transform: translateY(-1px) !important;
        }
        .btn-danger {
            background: #e74c3c !important;
            color: white !important;
            border: none !important;
            border-radius: 5px !important;
            font-weight: 600 !important;
            box-shadow: 0 2px 6px rgba(231, 76, 60, 0.25) !important;
        }
        .btn-danger:hover {
            background: #c0392b !important;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.35) !important;
        }
        .btn-primary {
            background: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 5px !important;
            font-weight: 600 !important;
            box-shadow: 0 2px 6px rgba(52, 152, 219, 0.25) !important;
            padding: 6px 12px !important;
            transition: all 0.3s ease !important;
        }
        .btn-primary:hover {
            background: #2980b9 !important;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.35) !important;
            transform: translateY(-1px) !important;
        }
        .x-grid-row-striped { background-color: #f9f9f9; }
        .x-grid-row { background-color: #ffffff; }
        .x-grid-cell { border-color: #e8e8e8; padding: 8px; }
        .x-column-header { background: linear-gradient(180deg, #f0f0f0 0%, #e8e8e8 100%); font-weight: 600; color: #333; border-color: #ddd; }
        .x-panel-header { background: #3498db; color: white; border: none; font-weight: 600; }
        .x-form-label { color: #2c3e50; font-weight: 600; }
        h3 { color: #2c3e50; border-left: 4px solid #3498db; padding-left: 12px; margin: 15px 0 10px 0; font-size: 16px; }
        hr { border: none; border-top: 1px solid #e8e8e8; margin: 15px 0; }
        .status-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            color: white;
        }
        .status-confirmed { background-color: #27ae60; }
        .status-pending { background-color: #f39c12; color: #ffffff; }
        .status-failed { background-color: #e74c3c; }
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