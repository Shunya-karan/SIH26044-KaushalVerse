# KaushalVerse SIH26044 Upgrade

This version extends the existing KaushalVerse prototype for the SIH26044 presentation without replacing the original application structure.

## Main connected demo
Industry competency blueprint -> skill assessment -> evidence-based skill passport -> role skill-gap analysis -> gap-driven learning roadmap -> opportunity match -> internship evaluation -> updated skill passport -> institution industry-demand intelligence.

## Added demo surfaces
- Student Skill Assessment
- Student Skill Passport
- Enhanced proficiency/evidence Skill Gap Analysis
- Gap-driven Learning Roadmap
- Explainable healthcare data analyst opportunity matching
- Company Competency Blueprints
- Company Internship Evaluation
- Faculty / Academician portal
- Industry Demand Intelligence for institution

## Demo persistence
The prototype stores its SIH demonstration state in localStorage under `kv_sih_demo_state`. Use the Student Dashboard `Reset Demo` action to restore the starting state.

## Demo accounts
Student, Company, Faculty and Institution Admin are available from the Login page in demo mode.

## Evidence-based Skill Passport
- Students can add a skill as self-declared and are immediately prompted to submit evidence.
- Evidence types: GitHub project/repository URL, certificate/course reference, and project/portfolio URL.
- Evidence stays pending until reviewed by Faculty/Institute.
- Faculty has a dedicated Skill Verification screen with Verify/Reject actions.
- Verified skills show Institute Verified status in My Skills and Skill Passport.
- Assessment and industry evaluation remain separate evidence sources.

### GitHub Evidence Update
- GitHub evidence no longer accepts arbitrary repository URLs.
- Student must use the Connect GitHub flow and then select a repository from the connected account's repository list.
- Faculty verification shows the connected account and selected repository evidence.
- The current frontend demo simulates OAuth; production deployment should connect the button to a GitHub OAuth backend/app and use the returned account repositories.
