const { createClient } = require("@supabase/supabase-js");

console.log("=================================");
console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log(
    "SUPABASE_SECRET_KEY existe =",
    !!process.env.SUPABASE_SECRET_KEY
);
console.log("=================================");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

module.exports = supabase;