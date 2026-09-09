const { createClient } = require("@supabase/supabase-js");
const env = require("./env");

const supabase = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey
);

module.exports = supabase;