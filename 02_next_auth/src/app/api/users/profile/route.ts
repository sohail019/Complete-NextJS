import User from "@/models/userModel";
import { connect } from "@/database/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    //? Extract data from token
    const userId = await getDataFromToken(request);

    const user = await User.findOne({_id: userId}).select("-password")
    
    //? Check if no user
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
