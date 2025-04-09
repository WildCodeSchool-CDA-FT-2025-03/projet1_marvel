import { dataSource } from '../client';

export default async function resetAutoIncrement(tableName: string): Promise<void> {
  try {
    await dataSource.query(`DELETE FROM sqlite_sequence WHERE name = ?`, [tableName]);
    console.info(`🔄 Reset auto-increment for table ${tableName}`);
  } catch (error) {
    console.warn(`⚠️ Could not reset auto-increment for table ${tableName}`, error);
  }
}
