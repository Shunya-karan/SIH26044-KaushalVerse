/**
 * Transparent Skill Matching Engine (Demo Algorithm)
 * Explains match breakdown without blackbox calculations.
 */
export function calculateSkillMatch(userSkills = [], requiredSkills = [], preferredSkills = []) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return {
      matchScore: 80,
      matchedSkills: [],
      missingSkills: [],
      matchedPreferred: [],
      missingPreferred: [],
      explanation: 'No mandatory skill requirements specified.',
    };
  }

  const normalizedUserSkills = new Set(
    userSkills.map((s) => (typeof s === 'string' ? s.toLowerCase() : s.name.toLowerCase()))
  );

  const matchedRequired = [];
  const missingRequired = [];

  requiredSkills.forEach((req) => {
    const reqLower = req.toLowerCase();
    if (normalizedUserSkills.has(reqLower)) {
      matchedRequired.push(req);
    } else {
      missingRequired.push(req);
    }
  });

  const matchedPreferred = [];
  const missingPreferred = [];

  preferredSkills.forEach((pref) => {
    const prefLower = pref.toLowerCase();
    if (normalizedUserSkills.has(prefLower)) {
      matchedPreferred.push(pref);
    } else {
      missingPreferred.push(pref);
    }
  });

  // Calculation: 80% weight for required skills, 20% weight for preferred skills
  const reqWeight = 0.8;
  const prefWeight = preferredSkills.length > 0 ? 0.2 : 0;
  const effectiveReqWeight = preferredSkills.length > 0 ? reqWeight : 1.0;

  const reqScore = (matchedRequired.length / requiredSkills.length) * (effectiveReqWeight * 100);
  const prefScore = preferredSkills.length > 0
    ? (matchedPreferred.length / preferredSkills.length) * (prefWeight * 100)
    : 0;

  const finalScore = Math.min(100, Math.round(reqScore + prefScore));

  const explanation = `Your match score is ${finalScore}% because you possess ${matchedRequired.length} out of ${requiredSkills.length} core required skills${
    preferredSkills.length > 0 ? ` and ${matchedPreferred.length} of ${preferredSkills.length} preferred bonus skills` : ''
  }.`;

  return {
    matchScore: finalScore,
    matchedSkills: matchedRequired,
    missingSkills: missingRequired,
    matchedPreferred,
    missingPreferred,
    explanation,
    totalRequired: requiredSkills.length,
    totalMatched: matchedRequired.length,
  };
}
