import { superdeno } from "https://deno.land/x/superdeno/mod.ts";
import { opine } from "https://deno.land/x/opine@1.9.1/mod.ts";

const app = opine();

app.get("/user", (_req, res) => {
  res.setStatus(200).json({ name: "Deno" });
});

superdeno(app)
  .get("/user")
  .expect("Content-Type", /json/)
  .expect("Content-Length", "15")
  .expect(200)
  .end((err, _res) => {
    if (err) throw err;
  });
