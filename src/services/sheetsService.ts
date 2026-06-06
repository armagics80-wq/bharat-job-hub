import { getGoogleAccessToken } from '../lib/firebase';

export interface SheetHeaderStatus {
  status: 'success' | 'warning' | 'failed' | 'unchecked';
  discoveredHeaders: string[];
  missingHeaders: string[];
}

export const STANDARD_HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Age',
  'Gender',
  'State Domicile',
  'District',
  'Category',
  'Ex-Serviceman',
  'PwD',
  'Educational Qualifications',
  'Uploaded Documents',
  'Other Certificates',
  'Email For Digest',
  'Digest Enabled',
  'Digest Frequency'
];

/**
 * Extracts a Google Spreadsheet ID from any standard Google Sheets URL.
 */
export const extractSpreadsheetId = (url: string): string | null => {
  if (!url) return null;
  // If already matches ID format directly
  if (/^[a-zA-Z0-9-_]{40,}$/.test(url.trim())) {
    return url.trim();
  }
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

/**
 * Creates a brand new Google Spreadsheet with pre-filled row 1 headers in the user's Drive.
 */
export const createNewGoogleSheet = async (title: string): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const token = getGoogleAccessToken();
  if (!token) {
    throw new Error('Google authentication is required to create a new spreadsheet.');
  }

  // 1. Create spreadsheet API call
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: title || 'National Job Registry - Backup Database'
      },
      sheets: [
        {
          properties: {
            title: 'Candidate Records'
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to create spreadsheet: status ${createRes.status}`);
  }

  const result = await createRes.json();
  const spreadsheetId = result.spreadsheetId;
  const spreadsheetUrl = result.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Set Row 1 header columns
  await appendRowToGoogleSheet(spreadsheetId, 'Candidate Records', STANDARD_HEADERS);

  return { spreadsheetId, spreadsheetUrl };
};

/**
 * Appends a row of values to a specific sheet range in Google Sheet
 */
export const appendRowToGoogleSheet = async (
  spreadsheetId: string,
  range: string,
  rowValues: any[]
): Promise<any> => {
  const token = getGoogleAccessToken();
  if (!token) {
    throw new Error('Google authentication token not found. Please log in first.');
  }

  const cleanRange = range || 'Candidate Records';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(cleanRange)}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [rowValues]
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to append values to sheet: status ${response.status}`);
  }

  return response.json();
};

/**
 * Attempts to inspect Row 1 (header row) of a spreadsheet to map column values
 */
export const inspectGoogleSheetHeaders = async (spreadsheetId: string): Promise<SheetHeaderStatus> => {
  const token = getGoogleAccessToken();
  if (!token) {
    return { status: 'unchecked', discoveredHeaders: [], missingHeaders: [] };
  }

  try {
    // 1. Get sheet info to locate the first sheet's title
    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!metaRes.ok) {
      return { status: 'failed', discoveredHeaders: [], missingHeaders: [] };
    }
    const metaData = await metaRes.json();
    const sheetTitle = metaData.sheets?.[0]?.properties?.title || 'Sheet1';

    // 2. Fetch Row 1 values
    const valRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A1:Z1`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!valRes.ok) {
      return { status: 'failed', discoveredHeaders: [], missingHeaders: [] };
    }

    const valData = await valRes.json();
    const discoveredHeaders: string[] = valData.values?.[0] || [];

    if (discoveredHeaders.length === 0) {
      return { status: 'failed', discoveredHeaders: [], missingHeaders: STANDARD_HEADERS };
    }

    // Check missing essential headers
    const normDiscovered = discoveredHeaders.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const missingHeaders = STANDARD_HEADERS.filter(std => {
      const normStd = std.toLowerCase().replace(/[^a-z0-9]/g, '');
      return !normDiscovered.includes(normStd);
    });

    const status = missingHeaders.length === 0 ? 'success' : 'warning';

    return {
      status,
      discoveredHeaders,
      missingHeaders
    };
  } catch (err) {
    console.warn('[inspectGoogleSheetHeaders] Error:', err);
    return { status: 'failed', discoveredHeaders: [], missingHeaders: [] };
  }
};

/**
 * Push profile candidate record utilizing direct Google Sheets API.
 */
export const syncCandidateToGoogleSheet = async (
  spreadsheetId: string,
  candidateData: any
): Promise<any> => {
  const token = getGoogleAccessToken();
  if (!token) {
    throw new Error('Google authorization token not found. Please log in first.');
  }

  // Determine sheet title (default first sheet or Candidate Records)
  let sheetTitle = 'Candidate Records';
  try {
    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (metaRes.ok) {
      const metaData = await metaRes.json();
      sheetTitle = metaData.sheets?.[0]?.properties?.title || 'Candidate Records';
    }
  } catch (err) {
    console.warn('[syncCandidateToGoogleSheet] Could not fetch spreadsheet metadata. Using default range.', err);
  }

  // 1. Inspect layout if possible to map standard values correctly
  const headerCheck = await inspectGoogleSheetHeaders(spreadsheetId);
  
  let rowToWrite: any[] = [];
  if (headerCheck.status === 'success' || (headerCheck.status === 'warning' && headerCheck.discoveredHeaders.length > 0)) {
    // Map data fields based on matching index labels
    const d = candidateData;
    const timestamp = d.timestamp ? new Date(d.timestamp).toLocaleString('en-IN') : new Date().toLocaleString('en-IN');
    
    // Create mapping helper
    const getVal = (col: string): any => {
      const norm = col.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (norm.includes('timestamp') || norm === 'time' || norm === 'date') return timestamp;
      if (norm.includes('name') || norm === 'fullname') return d.name || '';
      if (norm.includes('phone') || norm === 'mobile' || norm === 'contact') return d.phone || '';
      if (norm === 'age') return d.age || '';
      if (norm === 'gender') return d.gender || '';
      if (norm.includes('state') || norm === 'domicile') return d.state || '';
      if (norm === 'district') return d.district || '';
      if (norm.includes('category') || norm === 'reservation') return d.category || 'UR';
      if (norm.includes('exserviceman') || norm.includes('retired')) return d.isExServiceman || d.exServiceman || 'No';
      if (norm === 'pwd' || norm === 'pwbd') return d.isPWD || d.pwd || 'No';
      if (norm.includes('qualification')) return (Array.isArray(d.qualifications) ? d.qualifications.join(', ') : d.qualifications) || '';
      if (norm.includes('document')) return (Array.isArray(d.documents) ? d.documents.join(', ') : d.documents) || '';
      if (norm.includes('certificate')) return d.otherCertificates || '';
      if (norm.includes('emailfordigest') || norm.includes('digestemail')) return d.emailForDigest || '';
      if (norm.includes('digestenabled')) return d.digestEnabled ? 'Yes' : 'No';
      if (norm.includes('digestfrequency')) return d.digestFrequency || 'Weekly';
      return '';
    };

    rowToWrite = headerCheck.discoveredHeaders.map(col => getVal(col));
  } else {
    // Standard ordered array matching STANDARD_HEADERS
    const d = candidateData;
    const timestamp = d.timestamp ? new Date(d.timestamp).toLocaleString('en-IN') : new Date().toLocaleString('en-IN');
    rowToWrite = [
      timestamp,
      d.name || '',
      d.phone || '',
      d.age || '',
      d.gender || '',
      d.state || '',
      d.district || '',
      d.category || 'UR',
      d.isExServiceman || d.exServiceman || 'No',
      d.isPWD || d.pwd || 'No',
      (Array.isArray(d.qualifications) ? d.qualifications.join(', ') : d.qualifications) || '',
      (Array.isArray(d.documents) ? d.documents.join(', ') : d.documents) || '',
      d.otherCertificates || '',
      d.emailForDigest || '',
      d.digestEnabled ? 'Yes' : 'No',
      d.digestFrequency || 'Weekly'
    ];
  }

  return appendRowToGoogleSheet(spreadsheetId, sheetTitle, rowToWrite);
};
