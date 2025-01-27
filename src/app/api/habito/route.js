import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eyaraedkwjgspknimmfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const hoy = new Date().toISOString().split("T")[0];
  const { data: habitos, error } = await supabase
    .from("habito")
    .select("*")
    .eq("fecha", hoy);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(habitos), { status: 200 });
}

export async function PUT(request) {
  const body = await request.json();
  const id = body.id;
  const { data: updateData, error } = await supabase
    .from("habito")
    .update(body.update)
    .eq("id", id);

  return new Response(JSON.stringify({ success: "Actualizado" }), {
    status: 200,
  });
}

export async function POST(request) {
  function isFechaValida(fecha) {
    const fechaActual = new Date();
    const fechaHabitual = new Date(fecha);

    fechaActual.setHours(0, 0, 0, 0);
    fechaHabitual.setHours(0, 0, 0, 0);

    return fechaHabitual >= fechaActual;
  }

  const body = await request.json();
  const habito = body.habito;
  const { nombre, fecha } = habito; //PONER ASI O PONER COMO DICE ANDRÉS EJ --->   habito.nombre !== ""

  if (isFechaValida(fecha) && nombre !== "" && fecha !== "") {
    const { data: postData, error } = await supabase
      .from("habito")
      .insert(habito);

    if (!error) {
      return new Response(JSON.stringify({ success: "Creado con éxito" }), {
        status: 201,
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: "Alguno de los campos esta vacío" }),
      { status: 400 }
    );
  }

  return new Response(JSON.stringify({ success: "Actualizado" }), {
    status: 200,
  });
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;
  const { data: deleteData, error } = await supabase
    .from("habito")
    .delete()
    .eq("id", id);
  return new Response(JSON.stringify({ success: "Eliminado con éxito" }), {
    status: 200,
  });
}
