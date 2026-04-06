const requiredFields = ['name', 'email', 'service', 'message']

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export default async (req) => {
  if (req.method !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'method_not_allowed' })
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return jsonResponse(500, { ok: false, error: 'missing_turnstile_secret' })
  }

  let body

  try {
    body = await req.json()
  } catch {
    return jsonResponse(400, { ok: false, error: 'invalid_json' })
  }

  const { data = {}, formName, locale = 'en', subject = '', token } = body

  if (!formName || !token) {
    return jsonResponse(400, { ok: false, error: 'missing_payload' })
  }

  if (data['bot-field']) {
    return jsonResponse(200, { ok: true })
  }

  for (const field of requiredFields) {
    if (!data[field]) {
      return jsonResponse(400, { ok: false, error: `missing_${field}` })
    }
  }

  const verificationPayload = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token,
  })

  const remoteIp = req.headers
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim()

  if (remoteIp) {
    verificationPayload.set('remoteip', remoteIp)
  }

  const verificationResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: verificationPayload,
    },
  )

  const verificationResult = await verificationResponse.json()

  if (!verificationResponse.ok || !verificationResult.success) {
    return jsonResponse(400, {
      ok: false,
      error: 'captcha_failed',
      details: verificationResult['error-codes'] || [],
    })
  }

  const formPayload = new URLSearchParams({
    'form-name': formName,
    subject,
    language: locale,
    name: data.name || '',
    company: data.company || '',
    email: data.email || '',
    service: data.service || '',
    service_label: data.service_label || '',
    message: data.message || '',
    'bot-field': '',
  })

  const origin = new URL(req.url).origin
  const submissionResponse = await fetch(`${origin}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formPayload.toString(),
  })

  if (!submissionResponse.ok) {
    return jsonResponse(502, { ok: false, error: 'submission_failed' })
  }

  return jsonResponse(200, { ok: true })
}
