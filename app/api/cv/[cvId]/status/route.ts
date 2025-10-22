import { getStatusCvById } from "@/features/analysis/actions/get-status-cv-by-id"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cvId: string }> }
) {
  try {
    const { cvId } = await params
    if (!cvId) {
      return NextResponse.json({ error: "Missing cvId" }, { status: 400 })
    }

    const status = await getStatusCvById(cvId)

    if (!status) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 })
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error("[GET_CV_STATUS_ERROR]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
