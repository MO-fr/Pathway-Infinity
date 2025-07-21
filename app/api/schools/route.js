import Airtable from 'airtable';
import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;

let table;

initializeAirtable();

export async function GET(request) {

    try {

        // Get search parameter if present
        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('search');

        // Build query options
        const queryOptions = {
            maxRecords: 100,
            view: 'Grid view'
        };

        // Add search filter if search term exists
        if (searchTerm) {

            queryOptions.filterByFormula = `OR(
                SEARCH("${searchTerm}", LOWER({Name})),
                SEARCH("${searchTerm}", LOWER({Description})),
                SEARCH("${searchTerm}", LOWER({Location}))
            )`;
        }

        // Fetch records from Airtable
        const records = await table.select(queryOptions).all();
        const schools = transformRecords(records);

        console.log(`[Schools GET] transformResults schools ${NextResponse.json(schools)}`)

        return NextResponse.json(schools);

    } catch (error) {
        return handleAirtableError(error);
    }
}

export async function POST(request) {
    if (!table) {
        return NextResponse.json(
            { error: 'Airtable not initialized' },
            { status: 500 }
        );
    }

    try {
        const { answers, filters } = await request.json();
        let filterFormula = '';

        // Build filter based on quiz answers or explicit filters
        if (answers && Object.keys(answers).length > 0) {
            filterFormula = `OR(${Object.values(answers)
                .map(value => `SEARCH("${value}", {Industries})`)
                .join(',')})`;
        } else if (filters) {
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
                filterClauses.push(`{Cost} <= "${filters.costRange.max}"`);
            }

            if (filterClauses.length > 0) {
                filterFormula = `AND(${filterClauses.join(',')})`;
            }
        }

        // Query Airtable
        const records = await table.select({
            maxRecords: 100,
            view: 'Grid view',
            ...(filterFormula && { filterByFormula: filterFormula })
        }).all();

        const schools = transformRecords(records);
        return NextResponse.json(schools);
    } catch (error) {
        return handleAirtableError(error);
    }
}

// Initialize Airtable connection
function initializeAirtable() {
    
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID && AIRTABLE_TABLE_NAME) {

        try {

            const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
            
            table = base(AIRTABLE_TABLE_NAME);

            // Log configuration for debugging
            console.log('Airtable Configuration:', {
                baseId: AIRTABLE_BASE_ID,
                tableName: AIRTABLE_TABLE_NAME,
                apiKeyPrefix: AIRTABLE_API_KEY.substring(0, 10) + '...'
            });

        } catch (error) {
            console.error('Error initializing Airtable:', error);
         }
    }
}

/**
 * Transform Airtable records to clean objects
 */
function transformRecords(records) {

    console.log(`[School Route ] transformingRecords`)
    
    if (records && records.length > 0) {
        console.log('Airtable fields available:', Object.keys(records[0].fields));
        console.log('First record sample:', JSON.stringify(records[0].fields, null, 2));
    }

    return records.map(record => {
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
 * Handle Airtable errors
 */
function handleAirtableError(error) {
    console.error('Airtable Error:', error);

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
