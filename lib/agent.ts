export const serviceCatalog = {
  income: {
    label: {
      en: 'Income Certificate',
      hi: 'आय प्रमाण पत्र',
      bn: 'আয়ের সনদ',
      pa: 'ਇਨਕਮ ਸਰਟੀਫਿਕੇਟ',
      bho: 'आय प्रमाण-पत्र',
    },
    docs: [
      { key: 'aadhaar', label: 'Aadhaar card' },
      { key: 'addressProof', label: 'Address proof' },
      { key: 'photo', label: 'Passport size photo' },
    ],
    formFields: [
      { key: 'applicantName', label: 'Applicant name' },
      { key: 'address', label: 'Address' },
      { key: 'mobile', label: 'Mobile number' },
      { key: 'purpose', label: 'Purpose' },
    ],
  },
  domicile: {
    label: {
      en: 'Domicile Certificate',
      hi: 'निवास प्रमाण पत्र',
      bn: 'বাসস্থান শংসাপত্র',
      pa: 'ਡੋਮਿਕਾਈਲ ਸਰਟੀਫਿਕੇਟ',
      bho: 'निवास प्रमाण-पत्र',
    },
    docs: [
      { key: 'aadhaar', label: 'Aadhaar card' },
      { key: 'rationCard', label: 'Ration card or family ID' },
      { key: 'voterId', label: 'Voter ID' },
    ],
    formFields: [
      { key: 'applicantName', label: 'Applicant name' },
      { key: 'district', label: 'District' },
      { key: 'address', label: 'Address' },
      { key: 'duration', label: 'Duration of stay' },
    ],
  },
  caste: {
    label: {
      en: 'Caste Certificate',
      hi: 'जाति प्रमाण पत्र',
      bn: 'জাতি শংসাপত্র',
      pa: 'ਕਲਾਸ ਸਰਟੀਫਿਕੇਟ',
      bho: 'जाति प्रमाण-पत्र',
    },
    docs: [
      { key: 'aadhaar', label: 'Aadhaar card' },
      { key: 'casteProof', label: 'Caste proof' },
      { key: 'incomeSlip', label: 'Income proof or affidavit' },
    ],
    formFields: [
      { key: 'applicantName', label: 'Applicant name' },
      { key: 'community', label: 'Community' },
      { key: 'district', label: 'District' },
      { key: 'reason', label: 'Purpose' },
    ],
  },
};

export function detectServiceType(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes('income') || lower.includes('salary') || lower.includes('earning')) return 'income';
  if (lower.includes('domicile') || lower.includes('residency') || lower.includes('nivas')) return 'domicile';
  if (lower.includes('caste') || lower.includes('jati')) return 'caste';
  return 'income';
}

export function getServiceConfig(serviceType: string) {
  return serviceCatalog[serviceType as keyof typeof serviceCatalog] || serviceCatalog.income;
}

export function validateDocuments(serviceType: string, docs: Record<string, string> = {}) {
  const config = getServiceConfig(serviceType);
  const missing = config.docs
    .filter((doc) => !docs[doc.key] || String(docs[doc.key]).trim() === '')
    .map((doc) => doc.label);

  return {
    valid: missing.length === 0,
    missing,
  };
}

export function generateConsentPrompt(serviceType: string, language: string) {
  const config = getServiceConfig(serviceType);
  const label = config.label[language as keyof typeof config.label] || config.label.en;
  return `Your ${label} application is ready. Do you consent to submit it on the government portal?`;
}
