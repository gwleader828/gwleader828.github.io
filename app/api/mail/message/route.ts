import { NextRequest, NextResponse } from 'next/server'

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
    const { token, messageId } = await request.json()

    if (!token || !messageId) {
      return NextResponse.json(
        { success: false, error: 'Token and messageId are required' },
        { status: 400, headers: corsHeaders }
      )
    }

    const messageRes = await fetch(`https://api.mail.tm/messages/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })

    if (!messageRes.ok) {
      throw new Error('Failed to fetch message')
    }

    const message = await messageRes.json()

    return NextResponse.json(
      {
        success: true,
        message: {
          id: message.id,
          from: message.from.address,
          subject: message.subject,
          intro: message.intro,
          text: message.text || '',
          html: message.html || [],
          createdAt: message.createdAt,
          isRead: message.isRead,
        },
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error in message detail:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch message'
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
