import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;
  const taskId = Number(id);

  if (Number.isNaN(taskId)) {
    return Response.json(
      { error: "Invalid task ID" },
      { status: 400 }
    );
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return Response.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  return Response.json(task);
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const taskId = Number(id);
    const body = await request.json();

    if (Number.isNaN(taskId)) {
      return Response.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(body.title !== undefined && {
          title: body.title,
        }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.status !== undefined && {
          status: body.status,
        }),
        ...(body.priority !== undefined && {
          priority: body.priority,
        }),
      },
    });

    return Response.json(task);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Task not found or update failed" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const taskId = Number(id);

    if (Number.isNaN(taskId)) {
      return Response.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return Response.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Task not found or deletion failed" },
      { status: 404 }
    );
  }
}