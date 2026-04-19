export async function POST(req: Request) {
    const { email, password } = await req.json();
  
    console.log("User created:", email);
  
    return Response.json({ success: true });
  }