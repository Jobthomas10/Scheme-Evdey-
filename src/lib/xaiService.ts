import { BenefitReport } from "./types";
import { extractProfileFromStory, evaluateProfileSchemes } from "./schemeMatcher";

const XAI_API_KEY = process.env.XAI_API_KEY || "";

async function getAvailableXAIModels(): Promise<string[]> {
  if (!XAI_API_KEY) return ["grok-2-1212", "grok-2", "grok-beta"];

  try {
    const res = await fetch("https://api.x.ai/v1/models", {
      headers: {
        Authorization: `Bearer ${XAI_API_KEY.trim()}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      const modelIds = data.data?.map((m: any) => m.id) || [];
      console.log("xAI Available Models:", modelIds);
      return modelIds;
    } else {
      console.warn("xAI /v1/models status:", res.status, await res.text());
    }
  } catch (e) {
    console.warn("xAI /v1/models fetch error:", e);
  }
  return ["grok-2-1212", "grok-2", "grok-beta", "grok-2-vision-1212"];
}

export async function callXAiGrokReasoning(
  storyText: string,
  clarifyingAnswer?: string
): Promise<BenefitReport> {
  const fallbackProfile = extractProfileFromStory(storyText);
  const fallbackReport = evaluateProfileSchemes(fallbackProfile);

  if (!XAI_API_KEY) {
    return fallbackReport;
  }

  const systemPrompt = `You are the AI engine for "BenefitMax AI", an official government benefit discovery engine for Government of India and Kerala State schemes.

STRICT ACCURACY LAWS:
1. Provide ONLY accurate and verifiable information about Government of India & Kerala State Government schemes.
2. If the user describes school children (e.g. kids aged 12 and 15, or children in school), return PRE-MATRIC SCHOOL SCHOLARSHIPS (Classes 1 to 10) like "Kerala Pre-Matric Student Scholarship & Educational Assistance". Do NOT recommend college or B.Tech or Post-Matric scholarships for school kids!
3. If the user is a college/B.Tech student (age 17-25), return Post-Matric Scholarships (e-Grantz 3.0, PM-USP Central Sector Scholarship).
4. If the user is a Farmer, return PM-KISAN agricultural support.
5. If the user is a Senior Citizen (60+), return IGNOAPS Old Age Pension.
6. If the user is a Widowed female, return IGNWPS Widow Pension.
7. If NO scheme matches or income exceeds limits, return empty schemes array and aiReasoningSummary: "No official Government of India or State Government scheme matches the provided profile."

OUTPUT FORMAT: Return ONLY valid raw JSON matching this schema (no markdown tick blocks, no conversational preamble):
{
  "reportId": "JM-2026-KL-XXXXX",
  "createdAt": "${new Date().toISOString()}",
  "userStory": "user input text",
  "extractedProfile": {
    "state": "Kerala",
    "district": "string",
    "gender": "Male",
    "maritalStatus": "Married",
    "annualIncomeRupees": 200000,
    "dependentsCount": 2,
    "childrenInSchool": 2,
    "rationCardType": "Priority Household (PHH / Pink Card)",
    "occupation": "Parent / Householder",
    "age": 35,
    "rawStory": "user input text"
  },
  "benefitPotentialScore": 92,
  "scoreLabel": "Very High Scheme Eligibility",
  "estimatedAnnualBenefitsRupees": 74000,
  "applicationsReadyCount": 2,
  "missingDocsCount": 1,
  "aiReasoningSummary": "Verified summary text",
  "schemes": [
    {
      "id": "sch-1",
      "title": "Official English Scheme Name",
      "malayalamTitle": "Official Malayalam Title",
      "department": "Ministry/Department Name",
      "stateOrCentral": "Kerala State",
      "category": "education",
      "estimatedAnnualValue": 24000,
      "confidenceScore": 95,
      "status": "ready_today",
      "shortSummary": "Summary description",
      "whyEligible": ["Reason 1"],
      "whyNotOrPending": ["Pending 1"],
      "citation": {
        "docName": "Official G.O. Name",
        "clauseNumber": "Section Number",
        "excerpt": "Verbatim clause excerpt",
        "officialUrl": "https://education.kerala.gov.in"
      },
      "requiredDocuments": ["Doc 1"],
      "howToApply": "Application guide",
      "officialPortalUrl": "https://education.kerala.gov.in"
    }
  ],
  "roadmap": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "department": "Department",
      "actionRequired": "Action guide",
      "estimatedTime": "1-2 Days",
      "dependencies": ["Prereq 1"],
      "associatedSchemes": ["Scheme 1"],
      "priority": "Immediate",
      "channel": "Akshaya Kendra"
    }
  ],
  "documents": [
    {
      "id": "doc-1",
      "name": "Document Name",
      "malayalamName": "Malayalam Name",
      "status": "ready",
      "requiredForSchemes": ["Scheme 1"],
      "howToObtain": "Obtain guide",
      "issuingAuthority": "Authority Name"
    }
  ]
}`;

  const availableModels = await getAvailableXAIModels();
  const modelsToTry = availableModels.length > 0 ? availableModels : ["grok-2-1212", "grok-2", "grok-beta"];

  for (const modelName of modelsToTry) {
    try {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${XAI_API_KEY.trim()}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Analyze this citizen profile and return raw JSON: "${storyText}"${
                clarifyingAnswer ? ` (User Clarified: ${clarifyingAnswer})` : ""
              }`,
            },
          ],
          temperature: 0.1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let content = data.choices?.[0]?.message?.content;

        if (content) {
          content = content.trim();
          if (content.startsWith("```json")) {
            content = content.replace(/^```json/, "").replace(/```$/, "").trim();
          } else if (content.startsWith("```")) {
            content = content.replace(/^```/, "").replace(/```$/, "").trim();
          }

          const parsedReport: BenefitReport = JSON.parse(content);
          return parsedReport;
        }
      } else {
        const errorText = await response.text();
        console.warn(`xAI API (${modelName}) returned status ${response.status}: ${errorText}`);
      }
    } catch (e) {
      console.warn(`Error attempting xAI model ${modelName}:`, e);
    }
  }

  return fallbackReport;
}
