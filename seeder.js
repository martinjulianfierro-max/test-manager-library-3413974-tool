#!/usr/bin/env node

/**
 * Seeder de demostración para Manager Library (T-21)
 * Consume exclusivamente la API REST pública (/api/v1).
 * Requisitos: >= 40 libros, >= 10 socios, >= 15 préstamos, 3 vencidos.
 */

const API_BASE = process.env.API_URL || 'http://localhost:8000/api/v1';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin12345';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} en ${path}: ${JSON.stringify(data)}`);
  }

  return data;
}

async function main() {
  console.log(`[SEEDER] Conectando a ${API_BASE}...`);

  // 1. Iniciar sesión como admin
  console.log('[SEEDER] Autenticando admin...');
  const auth = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: ADMIN_USER, password: ADMIN_PASS }),
  });

  const token = auth.access_token;
  const authHeaders = { Authorization: `Bearer ${token}` };
  console.log('[SEEDER] Autenticado con éxito. Token recibido.');

  // 2. Obtener categorías
  const categories = await request('/categories', { headers: authHeaders });
  console.log(`[SEEDER] Categorías disponibles: ${categories.length}`);

  const catMap = {};
  for (const c of categories) {
    catMap[c.name] = c.id;
  }

  const novelaId = catMap['Novela'] || categories[0].id;
  const cienciaId = catMap['Ciencia'] || categories[1].id;
  const tecnoId = catMap['Tecnología'] || categories[2].id;
  const historiaId = catMap['Historia'] || categories[3].id;
  const infantilId = catMap['Infantil'] || categories[4].id;

  // 3. Crear 42 libros
  console.log('[SEEDER] Sembrando >= 40 libros...');
  const bookTemplates = [
    { title: 'Cien años de soledad', author: 'Gabriel García Márquez', cat: novelaId, total: 5 },
    { title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez', cat: novelaId, total: 4 },
    { title: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez', cat: novelaId, total: 3 },
    { title: 'Rayuela', author: 'Julio Cortázar', cat: novelaId, total: 4 },
    { title: 'Ficciones', author: 'Jorge Luis Borges', cat: novelaId, total: 5 },
    { title: 'El Aleph', author: 'Jorge Luis Borges', cat: novelaId, total: 3 },
    { title: 'Pedro Páramo', author: 'Juan Rulfo', cat: novelaId, total: 4 },
    { title: 'La ciudad y los perros', author: 'Mario Vargas Llosa', cat: novelaId, total: 3 },
    { title: 'La fiesta del chivo', author: 'Mario Vargas Llosa', cat: novelaId, total: 4 },
    { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', cat: novelaId, total: 6 },
    { title: 'Breve historia del tiempo', author: 'Stephen Hawking', cat: cienciaId, total: 4 },
    { title: 'El universo en una cáscara de nuez', author: 'Stephen Hawking', cat: cienciaId, total: 3 },
    { title: 'Cosmos', author: 'Carl Sagan', cat: cienciaId, total: 5 },
    { title: 'El mundo y sus demonios', author: 'Carl Sagan', cat: cienciaId, total: 4 },
    { title: 'El gen egoísta', author: 'Richard Dawkins', cat: cienciaId, total: 3 },
    { title: 'Sapiens: De animales a dioses', author: 'Yuval Noah Harari', cat: cienciaId, total: 6 },
    { title: 'Homo Deus', author: 'Yuval Noah Harari', cat: cienciaId, total: 4 },
    { title: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', cat: cienciaId, total: 3 },
    { title: 'El origen de las especies', author: 'Charles Darwin', cat: cienciaId, total: 4 },
    { title: 'La doble hélice', author: 'James D. Watson', cat: cienciaId, total: 3 },
    { title: 'Clean Code', author: 'Robert C. Martin', cat: tecnoId, total: 5 },
    { title: 'The Clean Coder', author: 'Robert C. Martin', cat: tecnoId, total: 4 },
    { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Gang of Four', cat: tecnoId, total: 4 },
    { title: 'Refactoring', author: 'Martin Fowler', cat: tecnoId, total: 4 },
    { title: 'Domain-Driven Design', author: 'Eric Evans', cat: tecnoId, total: 3 },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', cat: tecnoId, total: 5 },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', cat: tecnoId, total: 4 },
    { title: 'Structure and Interpretation of Computer Programs', author: 'Harold Abelson', cat: tecnoId, total: 3 },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', cat: tecnoId, total: 4 },
    { title: 'You Don’t Know JS', author: 'Kyle Simpson', cat: tecnoId, total: 5 },
    { title: 'Historia de dos ciudades', author: 'Charles Dickens', cat: historiaId, total: 4 },
    { title: 'Los cañones de agosto', author: 'Barbara W. Tuchman', cat: historiaId, total: 3 },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', cat: historiaId, total: 4 },
    { title: 'La Segunda Guerra Mundial', author: 'Antony Beevor', cat: historiaId, total: 3 },
    { title: 'Postguerra: Una historia de Europa desde 1945', author: 'Tony Judt', cat: historiaId, total: 3 },
    { title: 'Colapso', author: 'Jared Diamond', cat: historiaId, total: 3 },
    { title: 'El Principito', author: 'Antoine de Saint-Exupéry', cat: infantilId, total: 7 },
    { title: 'Donde viven los monstruos', author: 'Maurice Sendak', cat: infantilId, total: 4 },
    { title: 'Matilda', author: 'Roald Dahl', cat: infantilId, total: 5 },
    { title: 'Charlie y la fábrica de chocolate', author: 'Roald Dahl', cat: infantilId, total: 5 },
    { title: 'Las crónicas de Narnia: El león, la bruja y el armario', author: 'C. S. Lewis', cat: infantilId, total: 4 },
    { title: 'Alicia en el país de las maravillas', author: 'Lewis Carroll', cat: infantilId, total: 4 },
  ];

  const createdBooks = [];
  let isbnBase = 9789580000001n;

  for (const b of bookTemplates) {
    const isbn = (isbnBase++).toString();
    try {
      const book = await request('/books', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          title: b.title,
          author: b.author,
          isbn,
          category_id: b.cat,
          total_copies: b.total,
        }),
      });
      createdBooks.push(book);
    } catch (e) {
      // Si ya existía, buscarlo
      const found = await request(`/books?q=${encodeURIComponent(b.title)}`, { headers: authHeaders });
      if (found.items && found.items.length > 0) {
        createdBooks.push(found.items[0]);
      }
    }
  }
  console.log(`[SEEDER] Libros creados o listos: ${createdBooks.length}`);

  // 4. Crear 10 socios
  console.log('[SEEDER] Sembrando >= 10 socios...');
  const memberNames = [
    'Ana Lucía Morales',
    'Carlos Eduardo Gómez',
    'Beatriz Elena Restrepo',
    'David Fernando Rojas',
    'Elena María Pardo',
    'Francisco Javier Niño',
    'Gloria Inés Beltrán',
    'Hernán Darío Castro',
    'Isabel Cristina Valencia',
    'Jorge Alberto Medina',
    'Katia Patricia Salcedo',
    'Luis Alejandro Torres',
    'Mónica Marcela Ríos',
    'Nelson Eduardo Vargas',
    'Olga Lucía Herrera',
  ];

  const createdMembers = [];
  let docBase = 100200300;

  for (const name of memberNames) {
    const doc = (docBase++).toString();
    try {
      const m = await request('/members', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ full_name: name, document_number: doc }),
      });
      createdMembers.push(m);
    } catch {
      const found = await request(`/members?q=${encodeURIComponent(name)}`, { headers: authHeaders });
      if (found.items && found.items.length > 0) {
        createdMembers.push(found.items[0]);
      }
    }
  }
  console.log(`[SEEDER] Socios creados o listos: ${createdMembers.length}`);

  // 5. Crear 15 préstamos (3 con loaned_at en el pasado -> vencidos)
  console.log('[SEEDER] Sembrando 15 préstamos (3 vencidos)...');
  const pastDate = '2026-09-01T10:00:00Z'; // Vencen en septiembre 2026 (hace más de 14 días)
  const currentDate = '2026-10-09T10:00:00Z';

  // 3 préstamos vencidos (socios 0, 1, 2)
  for (let i = 0; i < 3; i++) {
    const member = createdMembers[i];
    const book = createdBooks[i];
    try {
      await request('/loans', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          member_id: member.id,
          items: [{ book_id: book.id }],
          loaned_at: pastDate,
        }),
      });
    } catch (e) {
      console.log(`[SEEDER] Préstamo vencido ${i + 1} ya existía o límite alcanzado.`);
    }
  }

  // 12 préstamos normales (socios 3 a 14)
  for (let i = 3; i < 15; i++) {
    const member = createdMembers[i];
    const book1 = createdBooks[(i * 2) % createdBooks.length];

    try {
      await request('/loans', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          member_id: member.id,
          items: [{ book_id: book1.id }],
          loaned_at: currentDate,
        }),
      });
    } catch (e) {
      console.log(`[SEEDER] Préstamo normal socio ${member.full_name}: omitido por límite de libros.`);
    }
  }

  // 6. Validar evidencia de T-21
  console.log('[SEEDER] Verificando evidencia de T-21...');
  const overdue = await request('/loans/overdue', { headers: authHeaders });
  console.log(`[SEEDER] Líneas vencidas en /loans/overdue: ${overdue.items.length}`);

  const report = await request('/reports/most-borrowed?from=2026-09-01&to=2026-10-31', { headers: authHeaders });
  console.log(`[SEEDER] Filas en reporte /reports/most-borrowed: ${report.rows.length}`);

  if (overdue.items.length >= 3 && report.rows.length > 0) {
    console.log('[SEEDER] ¡ÉXITO! Evidencia de T-21 cumplida satisfactoriamente.');
  } else {
    console.warn('[SEEDER] Atención: no se cumplió la evidencia completa.');
  }
}

main().catch((err) => {
  console.error('[SEEDER] Error fatal:', err);
  process.exit(1);
});
