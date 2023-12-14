/*
will process all jpg and png files from folder like :
e.g. take some file like my-exported-graphic.jpg, trace it and export it as my-exported-graphic.svg
*/

// SPECIFY YOUR OWN PATHS OR USE selectFolder() instead
var origin = Folder('F:/StorageForThingsIDK/Midjourney/Selling Out/Etsy/DnD Icons/Pack 10/PNG Pack 1');
var destination = Folder('F:/StorageForThingsIDK/Midjourney/Selling Out/Etsy/DnD Icons/Pack 10/DXF Pack 1');

var files = getFiles(origin);
convertFiles(files);
// select folder for import
function selectFolder() {
  // allow user to select from dialog
  return Folder.selectDialog('Please select the folder to be imported:', Folder('~/Development/sandbox/cyberpunk/refacto/my-tests'));
}

function getFiles(folder) {
  return folder ? folder.getFiles() : undefined;
}

function convertFiles(files) {
	var counter=0;
  if (files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (!file || !(file instanceof File)) continue;
      var filename = file.name;
      var valid = (filename.indexOf('.svg') != -1) || (filename.indexOf('.png') != -1)
      if (!valid) {
        continue;
      } else {
        counter=convertFile(files[i], counter);
      }
    }
  } else {
    alert('no file to convert');
  }
}
//Autocad for DXF Files
function write (document, filename) {
  var options = getOptions();
  var file = new File(destination + '/' + filename);
  document.exportFile(file, ExportType.AUTOCAD, options);
}
//apparently I was missing some settings, but this works
function getOptions() {
  var exportOptions = new ExportOptionsAutoCAD();
      exportOptions.exportFileFormat = AutoCADExportFileFormat.DXF;//DWG  DXF
      exportOptions.exportOption = AutoCADExportOption.PreserveAppearance;
      exportOptions.version = AutoCADCompatibility.AutoCADRelease21;
      exportOptions.exportSelectedArtOnly = true; //export selected objects true
      exportOptions.convertTextToOutlines = false;
      exportOptions.generateThumbnails = true;
      exportOptions.unit = AutoCADUnit.Millimeters;
    return exportOptions;
}
//save the file as an eps as well
function write2 (document, filename) {
    var opts = new EPSSaveOptions();
	var file = new File(destination + '/' + filename);
	document.saveAs(file,opts);
}

function convertFile (file,counter) {
  var filename = file.name;
  // create new document
  var document = app.documents.add();
  try {
	var layer = document.layers[0];
    layer.name = filename.substring(0, filename.indexOf('.'));
    // place image file in the layer
    var placed = layer.placedItems.add();
    placed.file = file;
    // position placed image in the document
    placed.top = document.height;
    placed.left = 0;
    // trace image with custom options derived from [Default] preset
    var plugin = placed.trace();
    var tracing = plugin.tracing;
    var options = tracing.tracingOptions;
	var tracingPresets = app.tracingPresetsList;
	plugin.name = layer.name;
    options.loadFromPreset(tracingPresets[19]);
    // apply tracing change and expand
	options.tracingMethod = TracingMethodType.TRACINGMETHODABUTTING;
	options.tracingMode = TracingModeType.TRACINGMODEBLACKANDWHITE;
	options.ignoreWhite = true;
	options.ignoreColor = true;
	options.strokes = false;
	app.redraw();
	tracing.expandTracing().selected = true;
    //tracing.expandTracing();
    // resize artboard to traced image
    var artboard = document.artboards[0];
    artboard.artboardRect = [0, placed.height, placed.width, 0];
    // easier to position group to origins first
    var element = document.pageItems[0];
    element.position = [0, document.artboards[0].artboardRect[1]];
    // then actually ungroup
    var group = document.groupItems[0];
    var nested = group.pageItems;
    var count = nested.length;
    for (var i = count - 1; i >= 0; i--) {
      nested[i].move(layer, ElementPlacement.PLACEATBEGINNING);
    }
    //var outname = 'TerrainLandscape' + counter + '.svg';
	var outname = layer.name + '.dxf';
	write(document, outname);
	//var outname2 = 'TerrainLandscape' + counter + '.png';
	var outname2 = layer.name + '.eps';
    write2(document, outname2);
	document.close(SaveOptions.DONOTSAVECHANGES);
  } catch (error) {
    document.close(SaveOptions.DONOTSAVECHANGES);
  }
  return counter;
}