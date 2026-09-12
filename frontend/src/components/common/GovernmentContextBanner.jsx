import React from "react";
import { Landmark, ShieldCheck, Award } from "lucide-react";

const LEADERSHIP_REFERENCES = [
  {
    photo: "/gov/pm-portrait.png",
    name: "Shri Narendra Modi",
    designation: "Hon'ble Prime Minister of India",
  },
  {
    photo: "/gov/minister-jp-nadda.png",
    name: "Shri Jagat Prakash Nadda",
    designation:
      "Hon'ble Union Minister of Health & Family Welfare and Chemicals & Fertilizers",
  },
  {
    photo: "/gov/Prataprao_Jadhav.png",
    name: "Shri Prataprao Jadhav",
    designation:
      "Hon'ble Minister of State (Independent Charge), Ministry of Ayush & Minister of State, Health & Family Welfare",
  },
];

export function GovernmentContextBanner({
  compact = false,
  showLeadership = false,
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
      {/* Main Context */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-lg bg-primary-soft p-2.5">
            <Landmark className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Institutional & Hackathon Context
            </p>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              KaushalVerse is developed as a{" "}
              <span className="font-medium text-foreground">
                Smart India Hackathon prototype
              </span>{" "}
              addressing the problem statement on academia–industry
              collaboration for skill mapping, internships and placement. It
              is a conceptual demonstration and is not an official Government
              of India portal.
            </p>
          </div>
        </div>

        {!compact && (
          <div className="flex shrink-0 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Award className="h-3.5 w-3.5" />
              Smart India Hackathon
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Conceptual Demonstration
            </span>
          </div>
        )}
      </div>

      {/* Leadership References */}
      {showLeadership && (
        <div className="mt-6 border-t border-border pt-6">
          <p className="mb-5 text-xs font-medium leading-relaxed text-muted-foreground">
            Institutional leadership reference — shown for problem-statement
            context only. These individuals are not affiliated with the
            KaushalVerse project team and have not endorsed this prototype.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {LEADERSHIP_REFERENCES.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center text-center"
              >
                {/* Larger Portrait */}
                <img
                  src={person.photo}
                  alt={person.name}
                  className="
                    h-28 w-28
                    rounded-full
                    border border-border
                    object-cover
                    shadow-sm
                    sm:h-32 sm:w-32
                  "
                />

                {/* Name */}
                <p className="mt-3 text-sm font-semibold leading-tight text-foreground">
                  {person.name}
                </p>

                {/* Designation */}
                <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
                  {person.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}