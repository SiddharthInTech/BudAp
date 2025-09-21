import { Resend } from "resend";
import { render } from "@react-email/render";

export async function sendEmail({ to, subject, react, html }) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("❌ RESEND_API_KEY environment variable is missing");
        return { success: false, error: "Email service not configured" };
    }

    const resend = new Resend(apiKey);

    try {
        const toArray = Array.isArray(to) ? to : [to];

        let payload = {
            from: "onboarding@resend.dev",
            to: toArray,
            subject,
        };

        if (react) {
            // Await the render to get the actual HTML string
            payload.html = await render(react);
        } else if (html) {
            payload.html = typeof html === "string" ? html : String(html);
        } else {
            payload.text = "No content provided.";
        }

        const htmlOutput = await render(react);

        console.log("📧 Final Payload Before Send:", {
            to: toArray,
            subject,
            htmlType: typeof htmlOutput,
            preview: htmlOutput.substring(0, 200) + "..." // only first 200 chars
        });

        payload.html = htmlOutput;


        const { data, error } = await resend.emails.send(payload);

        if (error) {
            console.error("❌ Resend API error:", error);
            return { success: false, error };
        }

        console.log("✅ Email sent successfully:", data);
        return { success: true, data };
    } catch (err) {
        console.error("❌ Failed to send email:", err);
        return { success: false, error: err?.message || "Unknown error occurred" };
    }
}
