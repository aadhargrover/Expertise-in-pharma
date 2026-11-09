/**
 * ExpertiseInPharma — website form receiver (Google Apps Script)
 *
 * Every form on the site POSTs JSON here. For each submission this script:
 *   1. appends a row to a tab named after the form (tabs/columns are created automatically),
 *   2. saves any attached CV / JD into a Drive folder and links it in the row,
 *   3. emails a notification to NOTIFY_EMAIL (Reply-To set to the submitter).
 *
 * Setup is described in HANDOVER.md → "Forms". This file is NOT uploaded to the web host.
 */

var NOTIFY_EMAIL = 'contact@sipedtech.com';        // who receives notifications (comma-separate for several)
var UPLOAD_FOLDER_NAME = 'Website form uploads';   // Drive folder for CVs / JDs
var ALLOWED_EXT = /\.(pdf|docx?)$/i;
var MAX_FILE_BYTES = 5 * 1024 * 1024;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var body = JSON.parse(e.postData.contents);
    var formName = String(body.form || 'Unknown form').slice(0, 90);
    var fields = body.fields || {};

    // Basic spam guard: every site form has an email field.
    var email = findEmail(fields);
    if (!email) return json({ ok: false, error: 'Missing email' });

    var row = { 'Submitted at': new Date(), 'Page': body.page || '' };
    Object.keys(fields).forEach(function (k) { row[k.trim()] = String(fields[k]).slice(0, 5000); });

    (body.files || []).forEach(function (f) {
      row[f.field || 'Attachment'] = saveFile(f, formName, email);
    });

    appendRow(formName, row);
    notify(formName, row, email);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the web-app URL in a browser to confirm it is live.
function doGet() {
  return json({ ok: true, status: 'ExpertiseInPharma form receiver is running' });
}

function findEmail(fields) {
  for (var k in fields) {
    var v = String(fields[k]).trim();
    if (/email/i.test(k) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return v;
  }
  return '';
}

function appendRow(formName, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(formName) || ss.insertSheet(formName);
  var keys = Object.keys(row);
  var lastCol = sheet.getLastColumn();
  var headers = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  keys.forEach(function (k) {
    if (headers.indexOf(k) === -1) headers.push(k);
  });
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);

  var values = headers.map(function (h) { return row.hasOwnProperty(h) ? row[h] : ''; });
  sheet.appendRow(values);
}

function saveFile(f, formName, email) {
  if (!f || !f.data) return '';
  if (!ALLOWED_EXT.test(f.name || '')) return 'Rejected file type: ' + f.name;
  var bytes = Utilities.base64Decode(f.data);
  if (bytes.length > MAX_FILE_BYTES) return 'Rejected (over 5 MB): ' + f.name;

  var folders = DriveApp.getFoldersByName(UPLOAD_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(UPLOAD_FOLDER_NAME);
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
  var blob = Utilities.newBlob(bytes, f.type || 'application/octet-stream',
    stamp + ' — ' + email + ' — ' + f.name);
  return folder.createFile(blob).getUrl();
}

function notify(formName, row, replyTo) {
  var lines = Object.keys(row).map(function (k) {
    var v = row[k] instanceof Date ? row[k].toString() : row[k];
    return '<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">' + esc(k) +
           '</td><td style="padding:4px 0">' + esc(v) + '</td></tr>';
  }).join('');
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: replyTo,
    subject: 'Website: ' + formName,
    htmlBody: '<p>New submission from the website form <b>' + esc(formName) + '</b>.</p>' +
              '<table style="font:14px Arial,sans-serif">' + lines + '</table>' +
              '<p style="color:#888">All submissions: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '</p>'
  });
}

function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
