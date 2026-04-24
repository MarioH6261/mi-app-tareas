const path = require('path');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// CONECTA A TU BASE DE DATOS AQUÍ
const supabaseUrl = 'https://xacdbfhrdneiefkyhwbe.supabase.co';
const supabaseKey = 'sb_publishable_PuxJjle5BWfO59m_CcSlFg_hAkme4U8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Obtener todas las tareas
app.get('/tareas', async (req, res) => {
    const { data, error } = await supabase.from('tareas').select('*');
    res.json(data);
});

// Crear una nueva tarea
app.post('/tareas', async (req, res) => {
    const { titulo } = req.body;
    const { data, error } = await supabase.from('tareas').insert([{ titulo }]);
    
    // ESTAS LÍNEAS NUEVAS NOS AYUDARÁN A VER EL ERROR
    if (error) console.log("❌ Error de Supabase:", error);
    else console.log("✅ Tarea guardada:", data);
    
    res.json(data);
});

// Borrar una tarea
app.delete('/tareas/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('tareas').delete().eq('id', id);
    res.json(data);
});
app.use(express.static(path.join(__dirname)));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));