const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSt1VZd1Q2EsAhP4jP2Dv3wYBeXCZ3Gg7IODc8gwWIDDBadQ826ktl8TK-0uuKx_6E/exec';

export interface EnrollmentPayload {
  studentName: string;
  studentId: string;
  studentCccd: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  selectedFeesText: string;
  totalAmountText: string;
  transferContent: string;
}

/**
 * Sends enrollment data to the Google Apps Script Web App.
 * Uses text/plain to avoid CORS preflight (OPTIONS request) issues with Google Apps Script.
 */
export const appendToGoogleSheet = async (data: EnrollmentPayload): Promise<boolean> => {
  const payload = {
    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    ...data,
  };

  try {
    // We send Content-Type text/plain to avoid CORS preflight, which Apps Script Web Apps don't support well.
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // Check if the request completed successfully.
    // Note: If using redirects or no-cors, we might not get full response.status,
    // but in 'cors' mode with Apps Script returning a JSON response, it should be ok.
    if (!response.ok) {
      throw new Error(`Google Apps Script returned status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu sang Google Apps Script:', error);
    // Fallback: If it's a CORS policy issue but the script actually ran successfully 
    // (a common behavior with Apps Script redirects if not handled perfectly),
    // we return true, but we should log it.
    // For safety, let's treat any successful HTTP transport or even a failure that is likely a redirect as success,
    // but standard fetch with redirect: "follow" handles this automatically!
    throw error;
  }
};
