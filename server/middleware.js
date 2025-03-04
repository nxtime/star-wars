// Custom middleware functions for json-server
export default function(req, res, next) {
  if (
    req.method === "GET" &&
    req.path === "/characters" &&
    req.query.withDetails === "true"
  ) {
    const db = req.app.db; // Access to the lowdb instance
    const characters = db.get("characters").value();
    const planets = db.get("planets").value();
    const species = db.get("species").value();
    const affiliations = db.get("affiliations").value();

    const result = characters.map((character) => {
      const homeWorld =
        planets.find((p) => p.id === character.homeWorldId) || null;
      const speciesInfo =
        species.find((s) => s.id === character.speciesId) || null;
      const affiliation =
        affiliations.find((a) => a.id === character.affiliationId) || null;

      return {
        ...character,
        homeWorldDetails: homeWorld,
        speciesDetails: speciesInfo,
        affiliationDetails: affiliation,
      };
    });

    return res.json(result);
  }

  next();
}
