"use server";

const BASE_URL = "https://ic-invest.mn";

export type FeedbackState = {
  ok: boolean;
  message: string;
};

function getCookieHeader(headers: Headers): string {
  const responseHeaders = headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies = responseHeaders.getSetCookie?.() ?? [];

  if (setCookies.length > 0) {
    return setCookies.map((cookie) => cookie.split(";")[0]).join("; ");
  }

  const rawCookie = headers.get("set-cookie");
  if (!rawCookie) return "";

  return rawCookie
    .split(/,(?=[^;]+=[^;]+)/)
    .map((cookie) => cookie.split(";")[0])
    .join("; ");
}

function readCsrfToken(html: string): string | null {
  const token =
    html.match(/name=["']_token["'][^>]*value=["']([^"']+)/i)?.[1] ??
    html.match(/value=["']([^"']+)["'][^>]*name=["']_token["']/i)?.[1];

  return token ? decodeHtmlEntities(token) : null;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, "/");
}

export async function submitFeedback(
  _previousState: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const locale = formData.get("locale") === "en" ? "en" : "mn";
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const feedback = String(formData.get("feedback") ?? "").trim();

  // The real contact page's own <form action="/storefeedback"> is missing
  // its locale segment (a bug in their template — the /en page has the same
  // literal action) and 404s if posted as-is. The route is actually
  // locale-prefixed: confirmed GET /mn/storefeedback and /en/storefeedback
  // both return 405 (route exists, POST-only), and a real POST to
  // /mn/storefeedback with a valid token 302-redirects back to the contact
  // page with a real success flash ("Амжилттай хүлээн авлаа") — verified
  // with a live test submission.
  const contactPageUrl = `${BASE_URL}/${locale}/contact-us`;
  const feedbackUrl = `${BASE_URL}/${locale}/storefeedback`;

  if (!name || !phone || !feedback) {
    return {
      ok: false,
      message:
        locale === "en"
          ? "Please complete your name, phone number and message."
          : "Нэр, утас болон санал хүсэлтээ бүрэн оруулна уу.",
    };
  }

  try {
    const contactPage = await fetch(contactPageUrl, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!contactPage.ok) {
      return {
        ok: false,
        message:
          locale === "en"
            ? "The feedback form is temporarily unavailable."
            : "Санал хүсэлтийн маягт одоогоор ажиллахгүй байна.",
      };
    }

    const csrfToken = readCsrfToken(await contactPage.text());
    if (!csrfToken) {
      return {
        ok: false,
        message:
          locale === "en"
            ? "The feedback security token could not be found."
            : "Санал хүсэлтийн хамгаалалтын token олдсонгүй.",
      };
    }

    const cookie = getCookieHeader(contactPage.headers);
    const response = await fetch(feedbackUrl, {
      method: "POST",
      redirect: "follow",
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: contactPageUrl,
        "User-Agent": "Mozilla/5.0",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: new URLSearchParams({
        _token: csrfToken,
        name,
        phone,
        feedback,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        message:
          locale === "en"
            ? "Something went wrong while sending. Please try again."
            : "Илгээх үед алдаа гарлаа. Дахин оролдоно уу.",
      };
    }

    return {
      ok: true,
      message:
        locale === "en"
          ? "Your message was received. Thank you."
          : "Амжилттай хүлээн авлаа. Баярлалаа.",
    };
  } catch {
    return {
      ok: false,
      message:
        locale === "en"
          ? "Something went wrong while sending. Please try again."
          : "Илгээх үед алдаа гарлаа. Дахин оролдоно уу.",
    };
  }
}
