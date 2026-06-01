import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.BLOG_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, body, slug, tags, meta_description, image_url } = req.body;

  if (!title || !body || !slug) {
    return res.status(400).json({ error: 'Missing required fields: title, body, slug' });
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        title,
        body,
        slug,
        tags: tags || [],
        meta_description: meta_description || '',
        image_url: image_url || null,
        published: true,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, article: data });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
