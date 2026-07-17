import React from "react";
import { AlertCircle, Archive, CheckCircle } from "lucide-react";

export default function ProductUsage({
  howToUse,
  warnings,
  storageInstructions,
}: {
  howToUse?: string[];
  warnings?: string[];
  storageInstructions?: string[];
}) {
  const hasContent =
    (howToUse && howToUse.length > 0) ||
    (warnings && warnings.length > 0) ||
    (storageInstructions && storageInstructions.length > 0);

  if (!hasContent) return null;

  return (
    <div className="py-4 space-y-8">
      {howToUse && howToUse.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-orange-500" />
            How to Use
          </h3>
          <ul className="space-y-3">
            {howToUse.map((step, stepIndex) => (
              <li key={step} className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-sm font-bold shrink-0">
                  {stepIndex + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {warnings && warnings.length > 0 && (
    <div className="bg-red-50 p-6 rounded-xl border border-red-100 h-full">
      <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-600" />
        Warnings & Precautions
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-red-700">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </div>
  )}

  {storageInstructions && storageInstructions.length > 0 && (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Archive className="w-5 h-5 text-slate-600" />
        Storage Instructions
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        {storageInstructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
    </div>
  )}
</div>
    </div>
  );
}
