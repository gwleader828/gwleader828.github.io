import { NextRequest, NextResponse } from 'next/server'

// CORS headers for Vercel serverless
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    // Get available domains
    const domainsRes = await fetch('https://api.mail.tm/domains', {
      headers: { 'Accept': 'application/json' },
    })
    
    if (!domainsRes.ok) {
      throw new Error('Failed to fetch domains')
    }

    const domainsData = await domainsRes.json()
    const domains = domainsData['hydra:member'] || []
    
    if (domains.length === 0) {
      throw new Error('No domains available')
    }

    // Pick random domain
    const domain = domains[Math.floor(Math.random() * domains.length)]
    
    // Generate random email
    const randomString = Math.random().toString(36).substring(2, 12)
    const email = `${randomString}@${domain.domain}`
    const password = Math.random().toString(36).substring(2, 15)

    // Create account
    const createRes = await fetch('https://api.mail.tm/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: email,
        password: password,
      }),
    })

    if (!createRes.ok) {
      const error = await createRes.json()
      console.error('Account creation error:', error)
      throw new Error(error.detail || 'Failed to create account')
    }

    // Login to get token
    const loginRes = await fetch('https://api.mail.tm/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: email,
        password: password,
      }),
    })

    if (!loginRes.ok) {
      throw new Error('Failed to login')
    }

    const tokenData = await loginRes.json()

    return NextResponse.json(
      {
        success: true,
        email: email,
        token: tokenData.token,
        id: tokenData.id,
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error in create-email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create email'
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
