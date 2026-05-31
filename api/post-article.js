import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.BLOG_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, body, tags, meta_description, slug } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required' });
    }

    try {
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );

        const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const { data, error } = await supabase
            .from('articles')
            .insert([{
                title,
                body,
                tags: tags || [],
                meta_description: meta_description || '',
                slug: generatedSlug,
                published: true,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;

        return res.status(200).json({ success: true, article: data[0] });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save article' });
    }
}