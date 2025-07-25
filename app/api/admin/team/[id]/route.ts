import { NextResponse } from "next/server"
import {
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
  TeamMember,
} from "../../../../../lib/db"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const teamMember = await getTeamMemberById(params.id)
    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error fetching team member:", error)
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const updatedTeamMember = await updateTeamMember(
      params.id,
      data as Partial<TeamMember>
    )
    return NextResponse.json(updatedTeamMember)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteTeamMember(params.id)
    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    )
  }
}
