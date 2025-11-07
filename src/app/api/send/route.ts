import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailAdress = process.env.RESEND_MY_EMAIL as string;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 입력 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 전송
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [emailAdress],
      subject: `새로운 문의: ${name}`,
      html: `
        <h2>새로운 문의가 도착했습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
