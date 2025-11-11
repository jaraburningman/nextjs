import { NextResponse } from "next/server";
import pool from "@/app/store/db";

// GET /api/expressions
export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM expressions ORDER BY id DESC LIMIT 20;");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching expressions:", error);
    return NextResponse.json({ error: "Failed to fetch expressions" }, { status: 500 });
  }
}

// POST /api/expressions
export async function POST(request: Request) {
  try {
    const { expression } = await request.json();
    const result = await pool.query(
      "INSERT INTO expressions (expression, created) VALUES ($1, NOW()) RETURNING *;",
      [expression]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating expression:", error);
    return NextResponse.json({ error: "Failed to create expression" }, { status: 500 });
  }
}
