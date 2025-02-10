import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const {OMDB_API_URL, OMDB_API_KEY} = process.env ?? ""
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('s');

    if ([query, OMDB_API_URL, OMDB_API_KEY].some(item => !item)) {
      return new Response('Missing required parameters: search query, API URL, or API key', { status: 400 });
    }

    const url = `${OMDB_API_URL}?s=${query}&apiKey=${OMDB_API_KEY}`
    console.log(`Fetching data from ${url}`)
    
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
