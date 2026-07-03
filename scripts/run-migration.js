const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wzdhdpaapfqumyjidsby.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZGhkcGFhcGZxdW15amlkc2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk3ODM5MywiZXhwIjoyMDk0NTU0MzkzfQ.48CKscyIs_i37CrqtWV6-1lV1a95iYpBJCJXLjyOR6k'
);

async function runMigration() {
  // Try to run SQL via exec_sql RPC
  try {
    const { data, error } = await supabase.rpc('exec_sql', { 
      query: 'SELECT 1 as test;' 
    });
    if (error) {
      console.log('exec_sql not available:', error.message);
      return false;
    } else {
      console.log('exec_sql works:', data);
      return true;
    }
  } catch (e) {
    console.log('exec_sql error:', e.message);
    return false;
  }
}

runMigration();
