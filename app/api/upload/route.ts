import { NextResponse } from 'next/server'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file     = formData.get('file') as File
    const folder   = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'File required hai' }, { status: 400 })
    }

    const bytes  = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Unique filename
    const ext = file.name.split('.').pop() || 'png'
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`

    // Upload path
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    await mkdir(uploadDir, { recursive: true })
    
    const filePath = join(uploadDir, uniqueFilename)
    await writeFile(filePath, buffer)

    // Return the public URL
    const url = `/uploads/${folder}/${uniqueFilename}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
