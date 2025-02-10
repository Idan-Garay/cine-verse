import { NextRequest } from "next/server";

export async function GET(request: NextRequest,{ params}:{ params: Promise<{ slug: string }>}) {
  try {
    const {OMDB_API_URL, OMDB_API_KEY} = process.env ?? ""
    const {slug} = await params

    if ([slug, OMDB_API_URL, OMDB_API_KEY].some(item => !item)) {
      return new Response('Missing required parameters: search query, API URL, or API key', { status: 400 });
    }

    const url = `${OMDB_API_URL}?t=${slug}&apiKey=${OMDB_API_KEY}`
    console.log(`Fetching data from ${OMDB_API_URL}?t=${slug}`)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Response.json(data)

  } catch (error) {
    console.error('Search error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
