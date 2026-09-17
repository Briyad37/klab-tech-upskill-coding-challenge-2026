import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const tasks = await prisma.task.findMany({
    where: status
      ? {
          status: status as "PENDING" | "COMPLETED",
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(tasks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.description) {
      return Response.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority ?? "MEDIUM",
        status: body.status ?? "PENDING",
      },
    });

    return Response.json(task, { status: 201 });
  } catch {
    return Response.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}