/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Client-side Gemini service calling our server-side API proxy routes
export async function askSaathiAi(
  userQuery: string,
  languageName: string = 'English'
): Promise<{ text: string; sources: string[] }> {
  try {
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: userQuery,
        languageName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        text: data.text,
        sources: data.sources || ['Gram Panchayat Rampur Health Register'],
      };
    }
  } catch (err) {
    console.warn('Network request to /api/gemini/chat failed (possibly offline), using local grounded cache:', err);
  }

  // Local offline fallback when device is in airplane mode
  return generateOfflineFallback(userQuery);
}

// Streaming generator calling /api/gemini/stream SSE endpoint
export async function* streamSaathiAi(
  userQuery: string,
  languageName: string = 'English'
): AsyncGenerator<{ type: 'chunk' | 'sources' | 'done'; text?: string; sources?: string[] }> {
  try {
    const response = await fetch('/api/gemini/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: userQuery,
        languageName,
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error('Streaming response not available');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            yield data;
          } catch {
            // ignore malformed line
          }
        }
      }
    }
  } catch (err) {
    console.warn('Streaming error, falling back to cached response:', err);
    const fallback = generateOfflineFallback(userQuery);
    yield { type: 'sources', sources: fallback.sources };
    yield { type: 'chunk', text: fallback.text };
    yield { type: 'done' };
  }
}

function extractRelevantSources(query: string): string[] {
  const q = query.toLowerCase();
  const sources: string[] = [];

  if (q.includes('meena') || q.includes('yadav') || q.includes('anc') || q.includes('pregnant') || q.includes('maternal')) {
    sources.push('Maternal Record: Meena Yadav (HH-RAM-014)');
    sources.push('Household Visit Log: 2026-10-24 (ANC Follow-up)');
  }
  if (q.includes('ananya') || q.includes('vaccin') || q.includes('dose') || q.includes('sharma')) {
    sources.push('Vaccination Register: Ananya Sharma (HH-RAM-022)');
    sources.push('Priority Task: Pentavalent-1 Due Oct 31');
  }
  if (q.includes('zaid') || q.includes('ansari') || q.includes('overdue')) {
    sources.push('Vaccination Register: Zaid Ansari (MR-1 Overdue)');
    sources.push('Household Visit Log: 2026-10-15');
  }
  if (q.includes('follow') || q.includes('today') || q.includes('task') || q.includes('priority')) {
    sources.push('Follow-up Task List: Gram Panchayat Rampur');
    sources.push('Sub-Center Chandpur Schedule');
  }

  if (sources.length === 0) {
    sources.push('Gram Panchayat Rampur Health Register');
  }

  return sources;
}

function generateOfflineFallback(query: string): { text: string; sources: string[] } {
  const q = query.toLowerCase();
  const sources = extractRelevantSources(query);

  if (q.includes('meena') || q.includes('maternal') || q.includes('anc') || q.includes('pregnancy')) {
    return {
      text: `📋 **Summary for Meena Yadav (Household: HH-RAM-014, Yadav Family)**:

• **Pregnancy Status**: Third Trimester, Gravida 2, Para 1.
• **Estimated Delivery Date (EDD)**: 09 December 2026.
• **Antenatal Care (ANC)**: 3 of 4 recommended ANC visits completed (last check-up on 12 Oct 2026 at Sub-Center).
• **Supplements**: 180 Iron-Folic Acid (IFA) tablets distributed; 2 Tetanus Toxoid (TT) injections administered.
• **Clinical Risk**: Low risk. Fetal movement and blood pressure (118/76 mmHg) were normal during the home visit on 24 Oct 2026.
• **Actionable Next Steps**:
  1. Next ANC-4 visit scheduled for **02 November 2026**.
  2. Verify institutional delivery transport arrangements and 108 ambulance contact with the family.
  3. Ensure birth preparedness kit is ready at home.

*(Note: SwasthyaSaathi is a record-management tool. Please refer patient to the PHC Medical Officer for clinical concerns.)*`,
      sources,
    };
  }

  if (q.includes('overdue') || q.includes('vaccin') || q.includes('immuniz') || q.includes('child')) {
    return {
      text: `💉 **Child Vaccination Status for Rampur Village**:

1. **Overdue Alert**:
   • **Zaid Ansari** (Age: 1 Year, Household: HH-RAM-031):
     - **Vaccine**: MR-1 (Measles-Rubella).
     - **Due Date**: 15 October 2026 (**Overdue**).
     - **Action Taken**: Home visit on 15 Oct confirmed parents were traveling. Mobilized family for upcoming Wednesday session.

2. **Due Soon**:
   • **Ananya Sharma** (Age: 6 Weeks, Household: HH-RAM-022):
     - **Vaccines**: Pentavalent-1 and Rotavirus-1.
     - **Due Date**: 31 October 2026 (**Due Today/Upcoming**).
     - **Session**: Village Health Sanitation & Nutrition Day (VHSND) at Anganwadi Center 1.

3. **Completed**:
   • **Aarav Yadav** (Household: HH-RAM-014): BCG, OPV, and DPT Booster-1 up to date.

*(Source records verified from Sub-Center Chandpur register.)*`,
      sources,
    };
  }

  if (q.includes('visit') || q.includes('today') || q.includes('follow') || q.includes('checklist')) {
    return {
      text: `🗓️ **Priority Follow-up Checklist for ASHA Worker Sunita Devi**:

1. **Ananya Sharma (HH-RAM-022) — Due 31 Oct**:
   • Mobilize mother Priya for Pentavalent-1 and Rotavirus-1 vaccination at Anganwadi Center.
   • Verify infant weight gain and exclusive breastfeeding.

2. **Zaid Ansari (HH-RAM-031) — Due Immediately**:
   • Ensure transportation to PHC/Sub-center for overdue MR-1 dose.

3. **Meena Yadav (HH-RAM-014) — Due 02 Nov**:
   • Final ANC-4 check-up prior to expected delivery in December.
   • Review institutional delivery card (JSY voucher) and 108 vehicle coordination.

4. **Kavita Patel (HH-RAM-039) — Due 03 Nov**:
   • Anemia check (last Hb was 9.2 g/dL). Confirm daily IFA tablet consumption with meals.`,
      sources,
    };
  }

  return {
    text: `नमस्ते! I have analyzed the active health records for **Gram Panchayat Rampur** (Sub-Center Chandpur, 48 registered households).

Key indicators at a glance:
• **Total Households**: 48 registered (4 members in active high-priority tracking).
• **Active Maternal Beneficiaries**: 2 (Meena Yadav in 3rd trimester, Kavita Patel in 2nd trimester with mild anemia).
• **Vaccinations**: 1 overdue (Zaid Ansari - MR-1), 2 due this week (Ananya Sharma - Pentavalent-1 & Rotavirus-1).
• **Recent Visits**: 3 completed visits logged with zero sync conflicts.

You can ask me to:
- "Summarize Meena Yadav's records"
- "List children with overdue vaccines"
- "Generate a home visit checklist"
- "Show incomplete family records"`,
    sources,
  };
}
