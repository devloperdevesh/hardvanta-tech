
export async function POST(req: Request) {
    const { email, password } = await req.json();
  
    // fake check (replace with DB later)
    if (email === "test@gmail.com" && password === "1234") {
      return Response.json({
        token: "fake-jwt-token-123",
      });
    }
  
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }