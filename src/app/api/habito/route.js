import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyaraedkwjgspknimmfb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){
    const{data:habitos, error} = await supabase
    .from('habito')
    .select('*')

    return new Response(JSON.stringify(habitos), {status:200})
}

export async function PUT(request){
    const body = await request.json()
    const id = body.id
    const{data: updateData, error} = await supabase
    .from("habito")
    .update(body.update)
    .eq("id",id)

    return new Response(JSON.stringify({success: "Actualizado"}), {status:200})
}