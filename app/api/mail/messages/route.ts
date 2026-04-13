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
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400, headers: corsHeaders }
      )
    }

    const messagesRes = await fetch('https://api.mail.tm/messages', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })

    if (!messagesRes.ok) {
      throw new Error('Failed to fetch messages')
    }

    const messagesData = await messagesRes.json()
    const messages = messagesData['hydra:member'] || []

    return NextResponse.json(
      {
        success: true,
        messages: messages.map((msg: any) => ({
          id: msg.id,
          from: msg.from.address,
          subject: msg.subject,
          intro: msg.intro,
          createdAt: msg.createdAt,
          isRead: msg.isRead,
        })),
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error in messages:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch messages'
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
