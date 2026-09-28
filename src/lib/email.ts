/**
 * HTML notification sent to the business when a visitor submits the
 * "Санал хүсэлт" contact form. Table-based layout with inline styles only —
 * email clients (Gmail/Outlook included) strip <style> blocks and don't
 * reliably support modern CSS, so this can't use the site's own Tailwind
 * classes.
 */
export function contactNotificationEmail(fields: {
  name: string;
  phone: string;
  feedback: string;
  locale: "mn" | "en";
}): { subject: string; html: string; text: string } {
  const { name, phone, feedback, locale } = fields;

  const submittedAt = new Date().toLocaleString(
    locale === "en" ? "en-US" : "mn-MN",
    { timeZone: "Asia/Ulaanbaatar", dateStyle: "long", timeStyle: "short" },
  );

  const t =
    locale === "en"
      ? {
          subject: `New contact request — ${name}`,
          eyebrow: "New contact request",
          heading: "Someone reached out on ic-invest.mn",
          name: "Full name",
          phone: "Phone",
          message: "Message",
          received: "Received",
          reply: "Reply by phone",
          footer:
            "This notification was sent automatically from the ic-invest.mn contact form.",
        }
      : {
          subject: `Шинэ санал хүсэлт — ${name}`,
          eyebrow: "Шинэ санал хүсэлт",
          heading: "ic-invest.mn сайтаас санал хүсэлт ирлээ",
          name: "Овог нэр",
          phone: "Утас",
          message: "Санал хүсэлт",
          received: "Ирсэн огноо",
          reply: "Утсаар холбогдох",
          footer: "Энэ мэдэгдэл ic-invest.mn сайтын холбоо барих маягтаас автоматаар илгээгдсэн.",
        };

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const html = `<!doctype html>
<html lang="${locale}">
  <body style="margin:0;padding:0;background-color:#f4f2ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e2da;">
            <tr>
              <td style="background-color:#080b0a;padding:28px 32px;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4a9d81;">
                  ${esc(t.eyebrow)}
                </p>
                <p style="margin:8px 0 0;font-size:20px;font-weight:700;color:#ffffff;">
                  IC Asset Management
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px;font-size:17px;font-weight:600;color:#0f1512;line-height:1.4;">
                  ${esc(t.heading)}
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                  <tr>
                    <td style="padding:14px 16px;background-color:#f7f6f2;border-radius:10px 10px 0 0;border-bottom:1px solid #ffffff;">
                      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#8a8a82;">${esc(t.name)}</p>
                      <p style="margin:4px 0 0;font-size:15px;color:#0f1512;font-weight:600;">${esc(name)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;background-color:#f7f6f2;border-bottom:1px solid #ffffff;">
                      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#8a8a82;">${esc(t.phone)}</p>
                      <p style="margin:4px 0 0;font-size:15px;">
                        <a href="tel:${esc(phone)}" style="color:#35785f;font-weight:600;text-decoration:none;">${esc(phone)}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;background-color:#f7f6f2;border-radius:0 0 10px 10px;">
                      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#8a8a82;">${esc(t.message)}</p>
                      <p style="margin:4px 0 0;font-size:15px;color:#0f1512;line-height:1.6;white-space:pre-wrap;">${esc(feedback)}</p>
                    </td>
                  </tr>
                </table>

                <p style="margin:20px 0 0;font-size:13px;color:#8a8a82;">
                  ${esc(t.received)}: ${esc(submittedAt)}
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                  <tr>
                    <td style="border-radius:10px;background-color:#35785f;">
                      <a href="tel:${esc(phone)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                        ${esc(t.reply)} →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f7f6f2;border-top:1px solid #e5e2da;">
                <p style="margin:0;font-size:12px;color:#9a9a92;line-height:1.5;">${esc(t.footer)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `${t.eyebrow}\n\n${t.name}: ${name}\n${t.phone}: ${phone}\n${t.message}: ${feedback}\n\n${t.received}: ${submittedAt}`;

  return { subject: t.subject, html, text };
}
