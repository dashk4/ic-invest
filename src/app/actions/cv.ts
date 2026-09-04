"use server";

import { CMS_BASE } from "@/lib/config";

const BASE_URL = CMS_BASE;

export type CvState = {
  ok: boolean;
  message: string;
};

function getCookieHeader(headers: Headers): string {
  const responseHeaders = headers as Headers & { getSetCookie?: () => string[] };
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
  return token
    ? token
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x2F;/gi, "/")
    : null;
}

export async function submitCv(
  _previousState: CvState,
  formData: FormData,
): Promise<CvState> {
  const locale = formData.get("locale") === "en" ? "en" : "mn";
  const jobId = String(formData.get("jobId") ?? "").trim();
  const senderName = String(formData.get("sender_name") ?? "").trim();
  const cvFile = formData.get("cv_file");

  const t = (mn: string, en: string) => (locale === "en" ? en : mn);

  if (!jobId) {
    return { ok: false, message: t("Ажлын байрны мэдээлэл олдсонгүй.", "Job listing not found.") };
  }
  if (!senderName || !(cvFile instanceof File) || cvFile.size === 0) {
    return {
      ok: false,
      message: t("Нэр болон CV файлаа бүрэн оруулна уу.", "Please provide your name and a CV file."),
    };
  }

  try {
    const contactPageUrl = `${BASE_URL}/${locale}/contact-us`;
    const contactPage = await fetch(contactPageUrl, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!contactPage.ok) {
      return {
        ok: false,
        message: t("Маягт одоогоор ажиллахгүй байна.", "The form is temporarily unavailable."),
      };
    }

    const csrfToken = readCsrfToken(await contactPage.text());
    if (!csrfToken) {
      return {
        ok: false,
        message: t(
          "Хамгаалалтын token олдсонгүй.",
          "The security token could not be found.",
        ),
      };
    }
    const cookie = getCookieHeader(contactPage.headers);

    // Unlike /storefeedback (locale-prefixed), this route is registered
    // without one — confirmed directly: GET /save/cvupload/{id} is 405
    // (exists, POST-only) while GET /mn/save/cvupload/{id} 404s.
    const body = new FormData();
    body.set("_token", csrfToken);
    body.set("sender_name", senderName);
    body.set("cv_file", cvFile, cvFile.name);

    const response = await fetch(`${BASE_URL}/save/cvupload/${jobId}`, {
      method: "POST",
      redirect: "follow",
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        Referer: contactPageUrl,
        "User-Agent": "Mozilla/5.0",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body,
    });

    if (!response.ok) {
      return {
        ok: false,
        message: t("Илгээх үед алдаа гарлаа. Дахин оролдоно уу.", "Something went wrong. Please try again."),
      };
    }

    return {
      ok: true,
      message: t("CV амжилттай илгээгдлээ. Баярлалаа.", "Your CV was submitted. Thank you."),
    };
  } catch {
    return {
      ok: false,
      message: t("Илгээх үед алдаа гарлаа. Дахин оролдоно уу.", "Something went wrong. Please try again."),
    };
  }
}
