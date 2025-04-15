import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCategories() {
    try {
      const data = await sql`
        SELECT category
        FROM categories;`
  
      return data.map(c=>c.category);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest invoices.');
    }
  }