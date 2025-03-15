import { POST } from "@/app/api/register/route";
import { NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, options?: any) => ({
      json: async () => data, 
      status: options?.status || 200,
    }),
  },
}));

describe("POST /api/register", () => {
  it("should return 400 for invalid data", async () => {
    const req = new Request("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({}), 
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json(); 

    expect(res.status).toBe(400);
    expect(json.error).toBe("Invalid data");
  });

  it("should return 201 for successful registration", async () => {
    const validUserData = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      orderDetails: "Sample Order",
      file: "test.pdf",
    };

    const req = new Request("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify(validUserData),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json(); 

    expect(res.status).toBe(201);
    expect(json.status).toBe("success");
    expect(json.message).toBe("User registered successfully");
    expect(json.token).toBe("yJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT");
  });
});
