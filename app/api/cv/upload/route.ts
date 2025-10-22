import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { CvType, OpportunityType } from "@prisma/client";
import { savePdf } from "@/features/upload-cv/actions/save-pdf";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/share/actions/get-current-user";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "File is required" }, { status: 400 });
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const userId = currentUser.id;

    // 1️⃣ Upload file to GCP (Cloud Storage)
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `CV-${uuidv4()}-${file.name}`;
    const { error, url } = await savePdf(file, { buffer, fileName });
    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 400 }
      );
    }

    // 2️⃣ Create CV and Attachment records
    const cv = await prisma.cv.create({
      data: {
        userId,
        language: "EN",
        opportunityType: OpportunityType.FULL_TIME,
        cvType: CvType.TECHNOLOGY,
        title: file.name,
        attachments: {
          create: {
            filename: file.name,
            mimeType: file.type,
            url,
            size: file.size,
          },
        },
      },
    });

    // 3️⃣ Trigger Inngest workflow
    await inngest.send({
      name: "cv/uploaded",
      data: {
        cvId: cv.id,
        attachmentUrl: url,
      },
    });

    return Response.json({ success: true, cvId: cv.id });
  } catch (error) {
    console.error("Error uploading CV:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
