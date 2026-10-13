export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const email = (form.get("email") || "").trim().toLowerCase();

  if (!email.includes("@")) return new Response("invalid email", { status: 400 });

  await env.DB.prepare("INSERT OR IGNORE INTO emails (email) VALUES (?)")
    .bind(email)
    .run();

  return Response.redirect(new URL("/thanks.html", request.url), 303);
}
