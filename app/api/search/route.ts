import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search published resources
    const resources = await db.resource.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { shortDescription: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: {
        id: true,
        title: true,
        slug: true,
        classLevel: true,
        priceInPaise: true,
        isFree: true,
        type: { select: { name: true } },
        chapter: {
          select: {
            title: true,
            subject: { select: { name: true, slug: true } },
          },
        },
      },
    });

    const formatted = resources.map((r) => ({
      id: r.id,
      title: r.title,
      url: `/notes/${r.slug}`,
      type: r.type.name,
      classLevel: r.classLevel,
      subject: r.chapter.subject.name,
      price: r.isFree ? "Free" : `₹${r.priceInPaise / 100}`,
    }));

    return NextResponse.json({ results: formatted });
  } catch (e) {
    // Return sample results if DB offline during development
    return NextResponse.json({
      results: [
        {
          id: "res-1",
          title: "Class 11 Physics: Kinematics & 2D Vectors",
          url: "/notes/class-11-physics-kinematics-and-vectors",
          type: "Concept Notes",
          classLevel: 11,
          subject: "Physics",
          price: "₹199",
        },
        {
          id: "res-2",
          title: "Class 12 Chemistry: Electrochemistry & Nernst Equation",
          url: "/notes/class-12-chemistry-electrochemistry-derivations",
          type: "Formula Sheet",
          classLevel: 12,
          subject: "Chemistry",
          price: "₹149",
        },
      ].filter((r) => r.title.toLowerCase().includes(q.toLowerCase())),
    });
  }
}
