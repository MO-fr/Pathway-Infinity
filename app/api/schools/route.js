/**
 * API Route for Airtable school data
 * 
 * This API route provides access to school data stored in Airtable.
 * It handles both fetching all schools and filtering schools based on specific criteria.
 * 
 * @note This file runs on the server only, which is why we can safely use
 * Node.js-specific modules like Airtable without the 'encoding' error that
 * happens when these modules are imported in client components.
 */

import Airtable from 'airtable';
import { NextResponse } from 'next/server';

// Validate that required environment variables are set
// Using server-side environment variables (not NEXT_PUBLIC_ prefixed)
// eslint-disable-next-line no-undef
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
// eslint-disable-next-line no-undef
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
// eslint-disable-next-line no-undef
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;

// Validate environment variables before proceeding
if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    // eslint-disable-next-line no-console
    console.error('Missing required Airtable environment variables');
    // We'll handle this in the route handlers to return a proper error response
}

/**
 * Initialize Airtable connection - we do this outside the handler
 * to avoid re-initializing on every request
 */
let base;
let table;

try {
    // Only initialize if all variables are present
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID && AIRTABLE_TABLE_NAME) {
        // Debug configuration info (will be removed in production)
        // eslint-disable-next-line no-console
        console.log('Airtable Configuration:', {
            baseId: AIRTABLE_BASE_ID,
            tableName: AIRTABLE_TABLE_NAME, // Show exact string for debugging
            apiKeyPrefix: AIRTABLE_API_KEY.substring(0, 10) + '...' // Only log prefix for security
        });

        base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

        // Handle potential issues with table name
        const cleanTableName = typeof AIRTABLE_TABLE_NAME === 'string'
            ? AIRTABLE_TABLE_NAME.replace(/"/g, '').trim() // Remove any quotes and trim whitespace
            : AIRTABLE_TABLE_NAME;

        // eslint-disable-next-line no-console
        console.log('Using cleaned table name:', cleanTableName);

        table = base(cleanTableName);
    }
} catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Airtable:', error);
    // We'll handle this in the route handlers
}

/**
 * Helper function to handle Airtable errors
 * @param {Error} error - The error object
 * @returns {NextResponse} - The error response
 */
function handleAirtableError(error) {
    // eslint-disable-next-line no-console
    console.error('Airtable Error:', error);

    // Check for specific error types
    if (error.error === 'NOT_AUTHORIZED') {
        return NextResponse.json(
            {
                error: 'Airtable authorization failed',
                details: 'Your API key does not have permission to access this base or table',
                message: error.message
            },
            { status: 403 }
        );
    } else if (error.error === 'NOT_FOUND') {
        return NextResponse.json(
            {
                error: 'Airtable resource not found',
                details: 'The specified base or table could not be found',
                message: error.message
            },
            { status: 404 }
        );
    } else {
        return NextResponse.json(
            {
                error: 'Airtable operation failed',
                details: error.message || 'Unknown error occurred',
                errorType: error.error || 'UNKNOWN'
            },
            { status: 500 }
        );
    }
}

/**
 * Helper function to transform Airtable records to clean objects
 * @param {Array} records - Raw Airtable records
 * @returns {Array} - Cleaned records with consistent structure
 */
function transformRecords(records) {
    // Log field structure from first record
    if (records && records.length > 0) {
        // eslint-disable-next-line no-console
        console.log('Airtable fields available:', Object.keys(records[0].fields));
        // eslint-disable-next-line no-console
        console.log('First record sample:', JSON.stringify(records[0].fields, null, 2));
    } return records.map(record => {
        // Start with the ID which is always present
        const result = {
            id: record.id
        };

        // Map the exact fields from Airtable to our application fields
        const fieldMappings = {
            'Name': 'name',
            'Pathway': 'pathway',
            'Industries': 'industries',
            'Program Length': 'programLength',
            'Cost': 'cost',
            'Housing': 'housing',
            'Website': 'website',
            'Location': 'location'
        };

        // Apply mappings for all known fields
        Object.entries(fieldMappings).forEach(([airtableField, appField]) => {
            result[appField] = record.fields[airtableField] || '';
        });

        // Special case for cost field
        if (result.cost === '') {
            result.cost = 'Contact for pricing';
        }

        return result;
    });
}

/**
 * GET handler for retrieving all schools or querying with a search parameter
 * Usage: 
 * - GET /api/schools - Returns all schools
 * - GET /api/schools?search=keyword - Returns schools matching the keyword
 */
export async function GET(request) {
    try {
        // Check for environment variables and initialization
        if (!table) {
            return NextResponse.json(
                { error: 'Airtable configuration is missing or invalid' },
                { status: 500 }
            );
        }

        // Get search parameter if present
        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('search');

        // Build filter formula if search term exists
        let filterByFormula = '';
        if (searchTerm) {
            filterByFormula = `OR(
        SEARCH("${searchTerm}", LOWER({Name})),
        SEARCH("${searchTerm}", LOWER({Description})),
        SEARCH("${searchTerm}", LOWER({Location}))
      )`;
        }

        // Query options
        const queryOptions = {
            maxRecords: 100,
            view: 'Grid view'
        };

        // Add filter if search term exists
        if (filterByFormula) {
            queryOptions.filterByFormula = filterByFormula;
        }

        // Fetch records from Airtable
        const records = await table.select(queryOptions).all();

        // Transform and return records
        const schools = transformRecords(records);

        return NextResponse.json({ schools });
    } catch (error) {
        return handleAirtableError(error);
    }
}

/**
 * POST handler for filtering schools based on provided criteria
 * Usage: POST /api/schools with body containing filter criteria
 */
export async function POST(request) {
    try {
        // Check for environment variables and initialization
        if (!table) {
            return NextResponse.json(
                { error: 'Airtable configuration is missing or invalid' },
                { status: 500 }
            );
        }

        // Parse the request body
        const { answers, filters } = await request.json();

        // Build filter formula based on quiz answers
        let filterByFormula = ''; if (answers && Object.keys(answers).length > 0) {
            // Create a filter based on quiz answers - using Industries field for matching
            filterByFormula = `OR(${Object.entries(answers)
                .map(([, value]) =>
                    `SEARCH("${value}", {Industries})`)
                .join(',')})`;
        } else if (filters) {
            // Alternative filtering mechanism if provided
            const filterClauses = [];

            if (filters.location) {
                filterClauses.push(`SEARCH("${filters.location}", {Location})`);
            }

            if (filters.pathway) {
                filterClauses.push(`SEARCH("${filters.pathway}", {Pathway})`);
            }

            if (filters.industries) {
                filterClauses.push(`SEARCH("${filters.industries}", {Industries})`);
            }

            if (filters.costRange) {
                // This is a simplified example - you might need more complex logic
                filterClauses.push(`{Cost} <= "${filters.costRange.max}"`);
            }

            if (filterClauses.length > 0) {
                filterByFormula = `AND(${filterClauses.join(',')})`;
            }
        }

        // Query options
        const queryOptions = {
            maxRecords: 100,
            view: 'Grid view'
        };

        // Add filter if we have one
        if (filterByFormula) {
            queryOptions.filterByFormula = filterByFormula;
        }        // Fetch records from Airtable
        const records = await table.select(queryOptions).all();

        // Transform and return records
        const schools = transformRecords(records);

        return NextResponse.json({ schools });
    } catch (error) {
        return handleAirtableError(error);
    }
}
