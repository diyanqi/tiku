"use client"

import dynamic from "next/dynamic"
import type {
  AllianceRow,
  QuestionRow,
  TableStat,
} from "@/components/dashboard-shell"

const DashboardShell = dynamic(() => import("@/components/dashboard-shell"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      正在加载界面...
    </div>
  ),
})

type DashboardShellLoaderProps = {
  stats: TableStat[]
  latestQuestions: QuestionRow[]
  alliancesPreview: AllianceRow[]
  questionsErrorMessage: string | null
  alliancesErrorMessage: string | null
}

export default function DashboardShellLoader(props: DashboardShellLoaderProps) {
  return <DashboardShell {...props} />
}
