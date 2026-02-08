import { db } from "../connections/db";

interface ColumnMetadata {
  column_name: string;
  data_type: string;
  is_primary_key: boolean;
  references_table: string | null;
}

export interface SchemaRow extends ColumnMetadata {
  table_name: string;
}

// The final JSON structure: { "table_name": [ { column_info }, ... ] }
export type DatabaseSchema = Record<string, ColumnMetadata[]>;

export async function getDatabaseSchema(): Promise<string> {
  const detailedSchemaQuery = `
    SELECT
        cols.table_name,
        cols.column_name,
        cols.data_type,
        kcu.constraint_name IS NOT NULL AS is_primary_key,
        ccu.table_name AS references_table
    FROM information_schema.columns cols
    LEFT JOIN information_schema.key_column_usage kcu
        ON cols.table_name = kcu.table_name 
        AND cols.column_name = kcu.column_name
        AND kcu.constraint_name LIKE '%_pkey'
    LEFT JOIN information_schema.constraint_column_usage ccu
        ON kcu.constraint_name = ccu.constraint_name
    WHERE cols.table_schema = 'public';
    `;

  const result = await db.query(detailedSchemaQuery);

  const rows = result.rows as unknown as SchemaRow[];

  // group columns by table_name
  const inventory = rows.reduce<DatabaseSchema>((acc, row) => {
    // Destructure to separate table_name from the column-specific data
    const { table_name, ...columnData } = row;

    if (!acc[table_name]) {
      acc[table_name] = [];
    }

    acc[table_name].push(columnData);
    return acc;
  }, {});

  // reduce length of schema for minimizing token usage
  const formattedInventory = formatInventoryForLLM(inventory);

  return formattedInventory;
}

function formatInventoryForLLM(inventory: DatabaseSchema): string {
  return Object.entries(inventory)
    .map(([tableName, columns]) => {
      const colStrings = columns.map((c) => {
        const pk = c.is_primary_key ? " (PK)" : "";
        const ref = c.references_table ? ` (FK -> ${c.references_table})` : "";
        return `- ${c.column_name}: ${c.data_type}${pk}${ref}`;
      });
      return `### Table: ${tableName}\n${colStrings.join("\n")}`;
    })
    .join("\n\n");
}
