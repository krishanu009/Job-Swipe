/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/search', 'N/record', 'N/log'], function(search, record, log) {
  
  function getInputData() {
    try {
      return search.load({
        id: 'customsearch_bcc_fam_asset_to_delete'
      });
    } catch (e) {
      log.error('Error loading saved search', e.message);
    }
  }

  function map(context) {
    var result = JSON.parse(context.value);
    var internalId = result.id; // or result.values.internalid.value depending on how it's structured

    context.write({
      key: internalId,
      value: internalId
    });
  }

  function reduce(context) {
    var assetId = context.key;

    try {
      record.delete({
        type: 'customrecord_ncfar_asset',
        id: assetId
      });
      log.audit('Deleted FAM Asset', 'ID: ' + assetId);
    } catch (e) {
      log.error('Failed to delete FAM Asset ID: ' + assetId, e.message);
    }
  }

  return {
    getInputData: getInputData,
    map: map,
    reduce: reduce
  };
});
