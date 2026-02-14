// Google Apps Script - paste this into Extensions > Apps Script in your Google Sheet
//
// Setup:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Replace the default code with this entire file
// 4. Click Deploy > New Deployment
// 5. Select "Web App" as the type
// 6. Set "Who has access" to "Anyone"
// 7. Click Deploy and authorize
// 8. Copy the Web App URL
// 9. Paste it into index.html as the WAITLIST_URL value

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),                  // Timestamp
    data.email,                  // Email
    data.source || 'website',    // Source (hero/footer/cta)
    data.referrer || ''          // Page referrer
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok', message: 'brncl waitlist endpoint'}))
    .setMimeType(ContentService.MimeType.JSON);
}
