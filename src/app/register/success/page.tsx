"use client";

import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center">Chargement…</p>}>
      <SuccessContent />
    </Suspense>
  );
}