'use client';

import Airtable from 'airtable';

const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const table = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME);

/**
 * Fetches matching schools based on quiz answers
 * @param {Object} answers - Quiz answers from the user
 * @returns {Promise<Array>} Array of matching schools
 */
export async function getMatchingSchools(answers) {
    try {        // Use answers to construct filter if needed
        const filter = answers ? `OR(${Object.entries(answers)
            .map(([, value]) =>
                `FIND("${value}", {Industries})`)
            .join(',')})` : '';

        // Fetch filtered records
        const records = await table.select({
            maxRecords: 100,
            view: 'Grid view',
            filterByFormula: filter || ''
        }).all();        // Transform records to clean objects
        return records.map(record => {
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
    } catch (error) {
        console.error('Error fetching from Airtable:', error);
        throw new Error('Failed to fetch trade schools');
    }
}
