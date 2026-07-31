import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'barbershop'

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

async function getDb() {
  const c = await clientPromise
  return c.db(dbName)
}

function json(data, init = {}) {
  return NextResponse.json(data, { status: 200, ...init })
}

async function handler(request, { params }) {
  const method = request.method
  const path = (params?.path || []).join('/')
  const url = new URL(request.url)

  try {
    const db = await getDb()
    const col = db.collection('appointments')

    // GET /api/ - health
    if (method === 'GET' && (path === '' || path === undefined)) {
      return json({ ok: true, service: 'barbershop-api' })
    }

    // GET /api/appointments
    if (method === 'GET' && path === 'appointments') {
      const list = await col.find({}, { projection: { _id: 0 } }).sort({ date: 1, time: 1 }).toArray()
      return json({ appointments: list })
    }

    // POST /api/appointments
    if (method === 'POST' && path === 'appointments') {
      const body = await request.json()
      const { service, date, time, name, phone } = body || {}
      if (!service || !date || !time || !name || !phone) {
        return json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
      }
      // Check duplicate slot
      const existing = await col.findOne({ date, time })
      if (existing) {
        return json({ error: 'Este horário já está reservado. Escolha outro.' }, { status: 409 })
      }
      const doc = {
        id: uuidv4(),
        service, date, time, name, phone,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
      await col.insertOne(doc)
      const { _id, ...clean } = doc
      return json({ appointment: clean }, { status: 201 })
    }

    // DELETE /api/appointments/:id
    if (method === 'DELETE' && path.startsWith('appointments/')) {
      const id = path.split('/')[1]
      const r = await col.deleteOne({ id })
      return json({ deleted: r.deletedCount === 1 })
    }

    return json({ error: 'Not found', path, method }, { status: 404 })
  } catch (e) {
    console.error('API error:', e)
    return json({ error: e.message || 'Internal error' }, { status: 500 })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
